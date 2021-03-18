
// Imports
function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
 }
 
 function sleep(n) {
    msleep(n * 1000);
 }
 
function main() {
    console.log("Ready");

    // TODO: Setup pin GPIO14 as an output

    for (let k = 0; k < 3; k++) {
        console.log("LED On");
        sleep(1);
        console.log("LED Off");
        sleep(1);
    }

}

main();