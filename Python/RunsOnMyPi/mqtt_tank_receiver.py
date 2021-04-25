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

if __name__ == '__main__':
    TankReceiver()

    while True:
        time.sleep(0.01)
