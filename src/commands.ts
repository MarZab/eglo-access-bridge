export function getCode(deviceName: string, commandName: string) {

    if (!deviceCommands[deviceName] || !Devices[deviceName]) {
         throw new Error(`Device ${deviceName} does not exist`);
    }

    if (!deviceCommands[deviceName][commandName]) {
         throw new Error(`Command ${commandName} does not exist for ${deviceName}`);
    }

    return `P213222221232${Devices[deviceName]}${deviceCommands[deviceName][commandName]}`
}

// prefix P213222221232

const Devices: Record<string, string> = {
    office: "13222222132221",
    bathroom: "13123222222131",
    hall: "13212222222232",
    bedroom: "22123221312322",
}

const deviceCommands: Record<string, Record<string, string>> = {
    office: {
        off: "3222221E",
        on: "3132221E",
        int_up: "7222213222122E",
        cold: "7222212322131E",
        warm: "7222212322122E",
        int_down: "7222213222131E",
        night: "722222123222221E",
        work: "722222123213221E",
        leisure: "722222123221321E",
        offafter30: "72222122322221222321E",
        fav1: "722222123222131E",
        fav2: "722222123213131E",
    },
    bathroom: {
        off: "3222221E",
        on: "3132221E",
        int_up: "7222213222122E",
        cold: "7222212322131E",
        warm: "7222212322122E",
        int_down: "7222213222131E",
        night: "722222123222221E",
        work: "722222123213221E",
        leisure: "722222123221321E",
        offafter30: "72222122322221222321E",
        fav1: "722222123222131E",
        fav2: "722222123213131E",
    },
    hall: {
        off: "2222221E",
        on: "2132221E",
        int_up: "6222213222122E",
        cold: "6222212322131E",
        warm: "6222212322122E",
        int_down: "6222213222131E",
        night: "622222123222221E",
        work: "622222123213221E",
        leisure: "622222123221321E",
        offafter30: "62222122322221222321E",
        fav1: "622222123222131E",
        fav2: "622222123213131E",
    },
    bedroom: {
        off: "2222221E",
        on: "2132221E",
        int_up: "6222213222122E",
        cold: "6222212322131E",
        warm: "6222212322122E",
        int_down: "6222213222131E",
        night: "622222123222221E",
        work: "622222123213221E",
        leisure: "622222123221321E",
        offafter30: "62222122322221222321E",
        fav1: "622222123222131E",
        fav2: "622222123213131E",
    },
}