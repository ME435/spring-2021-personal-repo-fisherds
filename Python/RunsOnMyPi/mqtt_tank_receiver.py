import mqtt_helper
import time
import rosebot

class TankReceiver:

    def __init__(self):
        self.robot = rosebot.RoseBot()
        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = self.mqtt_callback
        self.mqtt_client.connect(subscription_topic_name="fisherds/messagesForPi",
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
        if message_type == "servo/11":
            angle = payload[0]
            print("Camera tilt servo", angle)
            self.robot.servos.set_camera_angle(angle)
        if message_type == "servo/12":
            angle = payload[0]
            print("Joint 1", angle)
            self.robot.servos.set_joint_angle(1, angle)
        if message_type == "servo/13":
            angle = payload[0]
            print("Joint 2", angle)
            self.robot.servos.set_joint_angle(2, angle)
        if message_type == "servo/14":
            angle = payload[0]
            print("Joint 3", angle)
            self.robot.servos.set_joint_angle(3, angle)
        if message_type == "servo/15":
            distance_inches = payload[0]
            print("Gripper", distance_inches)
            self.robot.servos.set_gripper_inches(distance_inches)

if __name__ == '__main__':
    tank_receiver = TankReceiver()

    robot = tank_receiver.robot
    mqtt_client = tank_receiver.mqtt_client

    while True:
        # time.sleep(0.01)
        ultrasonic_message = "{} cm".format(robot.ultrasonic.get_distance())
        mqtt_client.send_message("sensor/ultrasonic", ultrasonic_message)

        line_sensor_message = "Left: {}  Middle: {}  Right: {}".format(
            robot.line_sensors.get_left_value(),
            robot.line_sensors.get_middle_value,
            robot.line_sensors.get_right_value())
        mqtt_client.send_message("sensor/line_sensor", line_sensor_message)
