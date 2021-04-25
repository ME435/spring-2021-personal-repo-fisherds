from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.properties import StringProperty
import mqtt_helper

class TankRemoteApp(MDApp):

    ultrasonic_text = StringProperty("???")
    line_sensor_text = StringProperty("???")

    def __init__(self, **kwargs):
        super(TankRemoteApp, self).__init__(**kwargs)

        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = self.mqtt_callback
        self.mqtt_client.connect(subscription_topic_name="fisherds/messagesForComputer",
                                    publish_topic_name="fisherds/messagesForPi")

    def mqtt_callback(self, message_type, payload):
        print("MQTT message_type", message_type)
        print("MQTT payload", payload)

        if message_type == "sensor/ultrasonic":
            self.ultrasonic_text = "Value = {}".format(payload)
        if message_type == "sensor/line_sensor":
            self.line_sensor_text = "Value = {}".format(payload)


    def build(self):
        self.theme_cls.primary_palette = "BlueGray"
        Window.size = (400, 600)
        return


if __name__ == '__main__':
    TankRemoteApp().run()
