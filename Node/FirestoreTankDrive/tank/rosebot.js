const rosebotDriveSystem = require("./rosebotDriveSystem");

class RoseBot {
  constructor() {
    // Motors
    this.driveSystem = new rosebotDriveSystem.DriveSystem();

    // Servos
    // this.armServos = 
    // this.gripperServo = 
    // this.cameraServo = 

    // Sensors
    // this.ultrasonic = 
    // this.irSensor = 

    // Camera

  }
}

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
  msleep(n*1000);
}

module.exports = {
  RoseBot,
  sleep,
  msleep
}