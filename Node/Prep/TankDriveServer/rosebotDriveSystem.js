const Gpio = require('pigpio').Gpio;

class Motor {
  constructor(pinEnable, pin1, pin2) {
    this.pin1 = new Gpio(pin1, {
      mode: Gpio.OUTPUT
    });
    this.pin2 = new Gpio(pin2, {
      mode: Gpio.OUTPUT
    });
    this.pwm = new Gpio(pinEnable, {
      mode: Gpio.OUTPUT
    });
  }

  turnOn(speed) {
    // Assumes the provided speed is -100 to 100
    // Note: scales the range to be -255 to 255 in this method.
    speed = Math.round(speed * 25 / 10); // Convert the +/- 100 to +/- 255
    speed = (speed < -255) ? -255 : speed;
    speed = (speed > 255) ? 255 : speed;
    if (speed > 0) {
      // Forwards
      this.pin1.digitalWrite(1);
      this.pin2.digitalWrite(0);
      this.pwm.pwmWrite(speed);
    } else if (speed < 0) {
      // Backwards
      this.pin1.digitalWrite(0);
      this.pin2.digitalWrite(1);
      this.pwm.pwmWrite(-speed);
    } else {
      this.turnOff();
    }
  }

  turnOff() {
    this.pin1.digitalWrite(0);
    this.pin2.digitalWrite(0);
    this.pwm.pwmWrite(0);
  }
}


class DriveSystem {
  constructor() {
    console.log("You created the drive system");
    const Motor_A_EN = 4;
    const Motor_B_EN = 17; // No hardware PWM!!!
    const Motor_A_Pin1 = 14;
    const Motor_A_Pin2 = 15;
    const Motor_B_Pin1 = 27;
    const Motor_B_Pin2 = 18;
    this.leftMotor = new Motor(Motor_B_EN, Motor_B_Pin1, Motor_B_Pin2);
    this.rightMotor = new Motor(Motor_A_EN, Motor_A_Pin2, Motor_A_Pin1);
  }

  go(leftSpeed, rightSpeed) {
    // Makes the left and right wheel motors spin at the given speeds
    // (which should each be integers between -100 and 100).
    this.leftMotor.turnOn(leftSpeed);
    this.rightMotor.turnOn(rightSpeed);
  }

  stop() {
    this.leftMotor.turnOff();
    this.rightMotor.turnOff();
  }
}

module.exports = {
  DriveSystem
}