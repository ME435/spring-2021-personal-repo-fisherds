"""
Authors:  Dave Fisher and PUT_YOUR_NAME_HERE.
"""
# TODO: 1.  Put your name in the above.

import time
import rosebot

def main():
    """ Test a robot's SERVOS. """
    print()
    print('--------------------------------------------------')
    print('Testing the  SERVOS  of a robot')
    print('--------------------------------------------------')

    robot = rosebot.RoseBot()

    while True:

        print("Type in a servo number.  Options:")
        print("11 --> Camera Tilt")
        print("12 --> Arm Joint 1")
        print("13 --> Arm Joint 2")
        print("14 --> Arm Joint 3")
        print("15 --> Gripper")
        servo_number = int(input("Servo number (11 to 15) or (0 to exit): "))
        if servo_number == 0:
            break
        elif servo_number == 11:
            angle = int(input("Camera title angle (0 to 60): "))
            robot.servos.set_camera_angle(angle)
        elif servo_number == 12:
            angle = int(input("Joint 1 angle (-90 to 90): "))
            robot.servos.set_joint_angle(1, angle)
        elif servo_number == 13:
            angle = int(input("Joint 2 angle (-90 to 90): "))
            robot.servos.set_joint_angle(2, angle)
        elif servo_number == 14:
            angle = int(input("Joint 3 angle (-90 to 90): "))
            robot.servos.set_joint_angle(3, angle)
        elif servo_number == 15:
            distance_inches = float(input("Gripper distance (inches 0.0 to 2.0): "))
            robot.servos.set_gripper_inches(distance_inches)
        else:
            print("Invalid servo number")


main()
