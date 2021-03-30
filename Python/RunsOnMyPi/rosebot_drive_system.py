import gpiozero as gz
import time

class Motor:
  def __init__(self, pin_1, pin_2, pin_enable):
    self.digital_output_1 = gz.DigitalOutputDevice(pin_1)
    self.digital_output_2 = gz.DigitalOutputDevice(pin_2)
    self.pwm_output = gz.PWMOutputDevice(pin_enable,frequency=1000)

  def turn_on(self, duty_cycle):
    if duty_cycle > 0:
      self.digital_output_1.on()
      self.digital_output_2.off()
      self.pwm_output.value = duty_cycle / 100.0
    elif duty_cycle < 0:
      self.digital_output_1.off()
      self.digital_output_2.on()
      self.pwm_output.value = -duty_cycle / 100.0
    else:
      self.turn_off()

  def turn_off(self):
    self.digital_output_1.off()
    self.digital_output_2.off()
    self.pwm_output.value = 0







# Testing / for development
if __name__ == "__main__":
  Motor_A_EN = 4
  Motor_B_EN = 17

  Motor_A_Pin1 = 14
  Motor_A_Pin2 = 15
  Motor_B_Pin1 = 27
  Motor_B_Pin2 = 18
  my_right_motor = Motor(Motor_A_Pin2, Motor_A_Pin1, Motor_A_EN)
  my_left_motor = Motor(Motor_B_Pin1, Motor_B_Pin2, Motor_B_EN)


  my_left_motor.turn_on(-30)
  time.sleep(2)
  my_left_motor.turn_off()
  
  



  print("Goodbye")
