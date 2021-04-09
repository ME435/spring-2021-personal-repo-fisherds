var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }
  
  function sleep(n) {
    msleep(n*1000);
  }

  

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: false
};
pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    console.log("Initialization done");
});

setTimeout(() => {
    console.log("after making driver");
    sleep(2);
    console.log("after delay");
    pwm.setPulseLength(15, 500);

    setTimeout(() => {
        pwm.setPulseLength(15, 1500);    
        console.log("Goodbye");
    }, 1500);
        
}, 50);



