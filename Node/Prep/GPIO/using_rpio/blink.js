// https://github.com/jperkin/node-rpio
rpio = require("rpio");

function main() {
    console.log("Ready");
    runBlink();
}

function runBlink() {
    console.log("Setup pin GPIO14 as an output");
    rpio.open(8, rpio.OUTPUT, rpio.LOW);
    for (let k = 0; k < 3; k++) {
        console.log("LED on");
        rpio.write(8, rpio.HIGH);
        rpio.sleep(1);

        console.log("LED off");
        rpio.write(8, rpio.LOW);
        rpio.msleep(500);
    }
}

main();