import {SerialPort} from "serialport";
import {ReadlineParser} from "@serialport/parser-readline";

const DEVICE_PATH = process.env.DEVICE_PATH;

// picocom -b 115200 --echo --omap crlf --imap lfcrlf /dev/ttyUSB0
const port = new SerialPort({
    path: DEVICE_PATH,
    baudRate: 115200,
})

const parser = port.pipe(new ReadlineParser({delimiter: '\n'}));

parser.on('data', (data: string) => {
    console.log(`SERIAL DATA: ${data}`);
})

port.on('error', function (err: any) {
    console.log('SERIAL ERROR: ', err.message)
})

let online = false;

port.on('open', function () {
    console.log(`SERIAL READY`)
    online = true;
});

export async function write(code: string, repeats = 15) : Promise<void>{
    if (!online) {
        throw new Error("Device not ready");
    }
    const command = `EGLO_TRANSMIT ${repeats} ${code}\n`;
    return new Promise((resolve, reject) => {
        port.write(command, function (err: any) {
            if (err) {
                return reject(err.message);
            }
            console.log(`SERIAL SENT: ${command}`)
            resolve();
        });
    });

}