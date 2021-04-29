const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const rosebot = require("./rosebot");
const robot = new rosebot.RoseBot();

function handleMessage(docSnapshot) {
  const message_type = docSnapshot.get("type");
  let payload = docSnapshot.get("payload");
  if (payload) {
    payload = JSON.parse(payload);
  }

  if (message_type == "motor/go") {
    const leftWheelSpeed = payload[0];
    const rightWheelSpeed = payload[1];
    console.log(`Motor go at ${leftWheelSpeed} ${rightWheelSpeed}`);
    robot.driveSystem.go(leftWheelSpeed, rightWheelSpeed);
  } else if (message_type == "motor/stop") {
    console.log("Motor stop");
    robot.driveSystem.stop();
  }
}

// Create a ref to the spot in the cloud.
const db = admin.firestore();
const ref = db.collection("Commands").doc("command");
ref.onSnapshot((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log(`Data: `, docSnapshot.data());
      handleMessage(docSnapshot);
    } else {
      console.log("Error: There is no document at this location");
    }
  },
  (err) => {
    console.log(`Encountered error: ${err}`);
  });