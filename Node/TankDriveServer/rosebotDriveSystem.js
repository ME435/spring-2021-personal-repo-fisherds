const Gpio = require("pigpio").Gpio;

class Motor {
  constructor(pin1, pin2, pinEnable) {
    this.digitOutput1 = new Gpio(pin1, {
      mode: Gpio.OUTPUT
    });
    this.digitOutput2 = new Gpio(pin2, {
      mode: Gpio.OUTPUT
    });
    this.pwmOutput = new Gpio(pinEnable, {
      mode: Gpio.OUTPUT
    });
  }

  turnOn(dutyCycle) {
    // Assume duty cycle is -100 to 100.
    // Scale -100<->100 to be -255<->255 for pipgio
    dutyCycle = Math.round(dutyCycle * 255 / 100);
    if (dutyCycle > 0) {
      this.digitOutput1.digitalWrite(1);
      this.digitOutput2.digitalWrite(0);
      this.pwmOutput.pwmWrite(dutyCycle);
    } else if (dutyCycle < 0) {
      this.digitOutput1.digitalWrite(0);
      this.digitOutput2.digitalWrite(1);
      this.pwmOutput.pwmWrite(-dutyCycle);
    } else {
      this.turnOff();
    }
  }

  turnOff() {
    this.digitOutput1.digitalWrite(0);
    this.digitOutput2.digitalWrite(0);
    this.pwmOutput.pwmWrite(0);
  }
}

// Test code area:

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}

const Motor_A_EN = 4;
const Motor_B_EN = 17; // No hardware PWM!!!
const Motor_A_Pin1 = 14;
const Motor_A_Pin2 = 15;
const Motor_B_Pin1 = 27;
const Motor_B_Pin2 = 18;
const leftMotor = new Motor(Motor_B_Pin1, Motor_B_Pin2, Motor_B_EN);
const rightMotor = new Motor(Motor_A_Pin2, Motor_A_Pin1, Motor_A_EN);
