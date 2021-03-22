const rpio = require('rpio');

function main() {
    console.log("Ready. to use rpio");

    // TODO: Setup pin GPIO14 (which is BOARD 8) as an output
    pinNumber = 8; // GPIO 14
    rpio.open(pinNumber, rpio.OUTPUT, rpio.LOW);

    for (let k = 0; k < 3; k++) {
        /* On for 1 second */
        console.log("LED On");
        rpio.write(pinNumber, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
        console.log("LED Off");
        rpio.write(pinNumber, rpio.LOW);
        rpio.msleep(500);
    }

}

main();