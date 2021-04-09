const express = require("express");
const rosebot = require("./rosebot");

const app = express();
app.use("/", express.static("public"));
const robot = new rosebot.RoseBot();

app.get("/api/motor/go/:leftWheelSpeed/:rightWheelSpeed", (req, res) => {
  const leftWheelSpeed = parseInt(req.params.leftWheelSpeed);
  const rightWheelSpeed = parseInt(req.params.rightWheelSpeed);
  console.log(`Drive system go ${leftWheelSpeed} ${rightWheelSpeed}`);
  robot.driveSystem.go(leftWheelSpeed, rightWheelSpeed);
  res.json({
    status: "ok",
    leftWheelSpeed: leftWheelSpeed,
    rightWheelSpeed: rightWheelSpeed
  });
});

app.get("/api/motor/stop", (req, res) => {
  console.log(`Drive system stop`);
  robot.driveSystem.stop();
  res.json({
    status: "ok"
  });
});


app.listen(3000);