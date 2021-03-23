function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }


function main() {
    console.log("Ready");
    // TODO: Set GPIO14 as an output

    for (let k = 0; k < 3; k++) {
        console.log("Turn the LED On");
        // TODO: Turn the LED On
        sleep(1);

        console.log("Turn the LED Off");
        // TODO: Turn the LED Off
        sleep(1);

    }


}

main();