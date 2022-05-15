import {SerialPort} from "serialport";
import {ReadlineParser} from "@serialport/parser-readline";

const DEVICE_PATH = process.env.DEVICE_PATH;

async function log(topic: string, e: string) {
    console.log(`[${Date.now().toLocaleString()}] ${topic}: ${e}`)
}

async function handleException(e: Error) {
    try {
        await log("EGLO", e.toString());
        console.log(e);
    } finally {
        await stop();
    }
}

// picocom -b 115200 --echo --omap crlf --imap lfcrlf /dev/ttyUSB0
const port = new SerialPort({
    path: DEVICE_PATH,
    baudRate: 115200,
})

const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

const devices: Record<string, Set<string>> = {};
const commands = new Set<string>();

let last_command = "";

const command_regex = /EGLO_TRANSMIT 15 P213222221232(?<id>[0-9]{14})(?<command>.+)/;

parser.on('data', (data: string) => {
    const match = command_regex.exec(data);
    if (match) {
        const {groups: {id, command}} = match;
        if (!(id in devices)) {
            devices[id] = new Set();
        }
        if (!devices[id].has(command)) {
            devices[id].add(command);
        }
        if (last_command !== `${id}${command}`) {
            log("SERIAL DETECTED", `${id} ${command}`);
            last_command = `${id}${command}`;
        }

        if (!commands.has(command)) {
            commands.add(command);
        }
    } else {
        log("SERIAL UNKNOWN", data);
    }
})

port.on('error', function (err: any) {
    console.log('Error: ', err.message)
})

port.on('open', function () {
    port.write('\nEGLO_SNIFF -90 0\n', function (err: any) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    })
});

async function stop() {

    console.log(`all commands`)
    console.log(`device; command`)
    for (const [device, commands] of Object.entries(devices)) {
        for (const command of Array.from(commands.values())) {
            console.log(`${device}; ${command}`);
        }
    }
    console.log("");
    process.exit();
}

process.on('SIGINT', stop);