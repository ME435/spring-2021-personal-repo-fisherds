import mqtt_helper
import time
import rosebot

class TankReceiver:
    def __init__(self):
        self.isStreamingSensorData = False
        self.robot = rosebot.RoseBot()
        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = self.mqtt_callback
        self.mqtt_client.connect(
            use_off_campus_broker=True,
            subscription_topic_name="fisherds/messagesForPi",
            publish_topic_name="fisherds/messagesForComputer")

    def mqtt_callback(self, message_type, payload):
        print("MQTT message_type", message_type)
        print("MQTT payload", payload)

        if message_type == "motor/go":
            left_wheel_speed = payload[0]
            right_wheel_speed = payload[1]
            print("motor/go", left_wheel_speed, right_wheel_speed)
            self.robot.drive_system.go(left_wheel_speed, right_wheel_speed)
        if message_type == "motor/stop":
            print("motor/stop")
            self.robot.drive_system.stop()

        # Servos
        if message_type == "servos":
            self.robot.servos.set_joint_angle(1, payload[0])
            self.robot.servos.set_joint_angle(2, payload[1])
            self.robot.servos.set_joint_angle(3, payload[2])
            self.robot.servos.set_gripper_inches(payload[3])
            self.robot.servos.set_camera_angle(payload[4])
        if message_type == "servo/11":
            angle = payload
            print("Camera tilt servo", angle)
            self.robot.servos.set_camera_angle(angle)
        if message_type == "servo/12":
            angle = payload
            print("Joint 1", angle)
            self.robot.servos.set_joint_angle(1, angle)
        if message_type == "servo/13":
            angle = payload
            print("Joint 2", angle)
            self.robot.servos.set_joint_angle(2, angle)
        if message_type == "servo/14":
            angle = payload
            print("Joint 3", angle)
            self.robot.servos.set_joint_angle(3, angle)
        if message_type == "servo/15":
            distance_inches = payload
            print("Gripper", distance_inches)
            self.robot.servos.set_gripper_inches(distance_inches)

        # Sensors
        if message_type == "sensors/on":
            self.isStreamingSensorData = True
        if message_type == "sensors/off":
            self.isStreamingSensorData = False

        

if __name__ == '__main__':
    tank_receiver = TankReceiver()

    robot = tank_receiver.robot
    mqtt_client = tank_receiver.mqtt_client

    while True:
        # time.sleep(0.01)
        if tank_receiver.isStreamingSensorData:
            ultrasonic_message = "{:5.1f} cm".format(robot.ultrasonic.get_distance())
            
            mqtt_client.send_message("sensor/ultrasonic", ultrasonic_message)

            line_sensor_message = "{} {} {}".format(
                "W" if robot.line_sensors.get_left_value() == 0 else "B",
                "W" if robot.line_sensors.get_middle_value() == 0 else "B",
                "W" if robot.line_sensors.get_right_value() == 0 else "B")
            mqtt_client.send_message("sensor/line_sensor", line_sensor_message)    
            print(ultrasonic_message, line_sensor_message)
        time.sleep(2)
