from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.properties import StringProperty
import mqtt_helper

class HelloButtonApp(MDApp):

    counter_text = StringProperty("Counter = 0")

    def __init__(self, **kwargs):
        super(HelloButtonApp, self).__init__(**kwargs)
        self.counter = 0

        self.mqtt_client = mqtt_helper.MqttClient()
        self.mqtt_client.callback = self.mqtt_callback
        self.mqtt_client.connect(subscription_topic_name="fisherds", publish_topic_name="fisherds")

    def mqtt_callback(self, message_type, payload):
        print("MQTT message_type", message_type)
        print("MQTT payload", payload)

        if message_type == "set":
            self.counter = payload
        elif message_type == "change":
            self.counter += payload
            
        self.update_view()

    def set_counter(self, value):
        self.mqtt_client.send_message("set", value)

    def change_counter(self, value):
        self.mqtt_client.send_message("change", value)

    def update_view(self):
        self.counter_text = "Counter = {}".format(self.counter)

    def build(self):
        # Done in the magic name .kv file  HelloButtonApp --> helloButton.kv
        Window.size = (400, 300)
        return


if __name__ == '__main__':
    HelloButtonApp().run()
