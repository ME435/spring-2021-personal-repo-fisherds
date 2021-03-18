// https://github.com/fivdi/onoff
const Gpio = require('onoff').Gpio;

// Imports
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
    console.log("Setup pin 14 as an output");
    const led = new Gpio(14, 'out');       // Export GPIO17 as an output
    for (let k = 0; k < 3; k++) {
        console.log("LED on");
        led.write(1);
        sleep(1);
        console.log("LED off");
        led.write(0);
        sleep(1);
    }
}

main();