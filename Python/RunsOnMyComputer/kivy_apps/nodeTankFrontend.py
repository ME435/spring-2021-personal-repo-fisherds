from kivy.app import App
from kivy.uix.widget import Widget
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout

import requests

api_url = "http://fisherds-tank.wlan.rose-hulman.edu:3000/api/"

class TankRemote(App):
  def send_stop(self, event):
    print("Sent stop")
    requests.get(api_url + "motor/stop")

  def send_drive_command(self, left_speed, right_speed):
    print("TODO: Send send_drive_command with " + str(left_speed) + " and " + str(right_speed))
    requests.get("{}motor/go/{}/{}".format(api_url, left_speed, right_speed))

  def build(self):
    grid_layout = GridLayout(cols=3)

    grid_layout.add_widget(Widget())
    forward_btn = Button(text="Forward")
    forward_btn.bind(on_press = lambda event: self.send_drive_command(100, 100))
    grid_layout.add_widget(forward_btn)
    grid_layout.add_widget(Widget())

    left_btn = Button(text="Left")
    left_btn.bind(on_press = lambda event: self.send_drive_command(-100, 100))
    grid_layout.add_widget(left_btn)

    stop_btn = Button(text="Stop")
    stop_btn.bind(on_press = self.send_stop)
    grid_layout.add_widget(stop_btn)

    right_btn = Button(text="Right")
    right_btn.bind(on_press = lambda event: self.send_drive_command(100, -100))
    grid_layout.add_widget(right_btn)

    grid_layout.add_widget(Widget())
    reverse_btn = Button(text="Reverse")
    reverse_btn.bind(on_press = lambda event: self.send_drive_command(-100, -100))
    grid_layout.add_widget(reverse_btn)
    grid_layout.add_widget(Widget())
    return grid_layout


if __name__ == '__main__':
  TankRemote().run()
