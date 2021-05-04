"""
Authors:  Dave Fisher and PUT_YOUR_NAME_HERE.
"""
# TODO: 1.  Put your name in the above.

import time
import rosebot


def main():
    print()
    print(" Ultrasonic (cm)     Line Sensors: Left  Middle  Right")
    print("-----------------                 -----  -----  -----")

    robot = rosebot.RoseBot()

    while True:
        print("      {:5.1f}                         {}      {}      {}".format(
            robot.ultrasonic.get_distance(),
            "W" if robot.line_sensors.get_left_value() == 0 else "B",
            "W" if robot.line_sensors.get_middle_value() == 0 else "B",
            "W" if robot.line_sensors.get_right_value() == 0 else "B"))
        time.sleep(1)


main()
