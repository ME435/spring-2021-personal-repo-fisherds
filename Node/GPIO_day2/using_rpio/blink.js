const rpio = require('rpio');

 function main() {
     console.log("Ready");
     // TODO: Setup GPIO 14 as an OUTPUT
     const pinNumber = 8; // GPIO14
     rpio.open(pinNumber, rpio.OUTPUT, rpio.LOW);

     for (let k = 0; k < 3; k++) {
        /* On for 1 second */
         console.log("LED On");
        rpio.write(pinNumber, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
        console.log("LED OFF");
        rpio.write(pinNumber, rpio.LOW);
        rpio.msleep(500);
     }

 }

 main();