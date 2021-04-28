const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const rosebot = require("./rosebot");
const robot = new rosebot.RoseBot();
https://fisherds-moviequoteusers.web.app/images/rose_logo.png
const db = admin.firestore();
const ref = db.collection("Commands").doc("command");

ref.onSnapshot((docSnapshot) => {
  if (docSnapshot.exists) {
    console.log(docSnapshot.data());

    const messageType = docSnapshot.get("type");
    let payload = docSnapshot.get("payload");
    if (payload) {
      payload = JSON.parse(payload);
    }

    if (messageType == "motor/go") {
      const leftWheelSpeed = payload[0];
      const rightWheelSpeed = payload[1];
      console.log("Motor go @", leftWheelSpeed, rightWheelSpeed);
      robot.driveSystem.go(leftWheelSpeed, rightWheelSpeed);

    } else if (messageType == "motor/stop") {
      console.log("Motor Stop");
      robot.driveSystem.stop();
    }
  }
}, (err) => {
  console.log(`Error: ${err}`)
});
