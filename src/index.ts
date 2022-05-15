import {MQTT} from "./mqtt";
import {getCode} from "./commands";
import {write} from "./eglo";

const mqttClient = new MQTT("eglo-connect");

async function stop() {
    try {
        await mqttClient.stop(true);
    } catch (e) {
        console.log("MQTT: ", e.toString());
    }
    process.exit();
}

async function handleException(e: Error) {
    try {
        console.log("EGLO", e.toString());
        console.log(e);
    } finally {
        await stop();
    }
}

(async () => {
    await mqttClient.connect();

    await mqttClient.subscribe(`eglo-connect/#`);

    const commandRegex = /^eglo-connect\/(?<device>[^\/]+)\/set$/;

    mqttClient.listen(async (topic, payload, packet) => {
        const match = commandRegex.exec(topic);
        console.log("MQTT: ", topic, payload.toString());
        if (match) {
            const {command} = JSON.parse(payload.toString());
            const code = getCode(match.groups.device, command);
            await write(code);
        }
    });

})().catch(handleException);

process.on('SIGINT', stop);