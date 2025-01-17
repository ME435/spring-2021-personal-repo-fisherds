const Gpio = require('pigpio').Gpio;

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }

 function main() {
     let ledState = 0;
     console.log("Ready using Pi GPIO");
     // TODO: Setup GPIO 14 as an OUTPUT
     const led = new Gpio(14, {mode: Gpio.OUTPUT});
     const pushbutton = new Gpio(25, {mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_UP,
        edge: Gpio.FALLING_EDGE
    });
    pushbutton.glitchFilter(20000);

    pushbutton.on('interrupt', (level, tick) => {
        console.log("You pressed the button");
        led.digitalWrite(ledState);
        ledState ^= 1;
    });

    console.log("Goodbye.  The program is over.");
 }

 main();