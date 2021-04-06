const rosebotDriveSystem = require("./rosebotDriveSystem");

class RoseBot {
  constructor() {
    console.log("Your created a RoseBot");
    // Drive motors
    this.driveSystem = new rosebotDriveSystem.DriveSystem();
  }
}

module.exports = {
  RoseBot
}