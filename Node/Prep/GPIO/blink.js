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
    for (let k = 0; k < 3; k++) {
        console.log("LED on");
        sleep(1);
        console.log("LED off");
        sleep(1);
    }
}

main();