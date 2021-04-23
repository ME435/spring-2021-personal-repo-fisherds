from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.properties import StringProperty
import mqtt_helper

class TankRemoteApp(MDApp):

    def __init__(self, **kwargs):
        super(TankRemoteApp, self).__init__(**kwargs)

        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = self.mqtt_callback
        self.mqtt_client.connect(subscription_topic_name="fisherds/messagesForComputer", 
                                    publish_topic_name="fisherds/messagesForPi")

    def mqtt_callback(self, message_type, payload):
        print("MQTT message_type", message_type)
        print("MQTT payload", payload)

        self.update_view()

    def update_view(self):
        print("TODO: Update the view as needed")

    def build(self):
        Window.size = (400, 600)
        return


if __name__ == '__main__':
    TankRemoteApp().run()
