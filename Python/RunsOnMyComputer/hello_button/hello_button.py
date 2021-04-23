from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.properties import StringProperty

class HelloButtonApp(MDApp):

    counter_text = StringProperty("Counter = 0")

    def __init__(self, **kwargs):
        super(HelloButtonApp, self).__init__(**kwargs)
        self.counter = 0

    def set_counter(self, value):
        self.counter = value
        self.update_view()

    def change_counter(self, value):
        self.counter += value
        self.update_view()

    def update_view(self):
        self.counter_text = "Counter = {}".format(self.counter)

    def build(self):
        # Done in the magic name .kv file  HelloButtonApp --> helloButton.kv
        # Window.size = (400, 300)
        return


if __name__ == '__main__':
    HelloButtonApp().run()
