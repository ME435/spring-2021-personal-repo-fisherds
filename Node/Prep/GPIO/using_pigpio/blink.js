// https://github.com/fivdi/pigpio

// Imports
const Gpio = require('pigpio').Gpio;



function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
    msleep(n * 1000);
}




function main() {
    console.log("Ready");
    runBlink();
}

function runBlink() {
    console.log("Setup pin 14 as an output. Crash on my Pi 400");
    const led = new Gpio(14, {mode: Gpio.OUTPUT});

    for (let k = 0; k < 3; k++) {
        console.log("LED on");
        led.digitalWrite(1);
        sleep(1);
        console.log("LED off");
        led.digitalWrite(0);
        sleep(1);
    }
}

main();