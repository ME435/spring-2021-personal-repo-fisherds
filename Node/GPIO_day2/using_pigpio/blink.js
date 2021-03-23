const Gpio = require('pigpio').Gpio;

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }

 function main() {
     console.log("Ready using Pi GPIO");
     // TODO: Setup GPIO 14 as an OUTPUT
     const led = new Gpio(14, {mode: Gpio.OUTPUT});


     for (let k = 0; k < 3; k++) {
         console.log("LED On");
         led.digitalWrite(1);
         sleep(1);

         console.log("LED OFF");
         led.digitalWrite(0);
         sleep(1);
     }

 }

 main();