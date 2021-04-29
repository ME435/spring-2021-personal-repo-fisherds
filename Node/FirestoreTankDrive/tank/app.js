const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const rosebot = require("./rosebot");
const robot = new rosebot.RoseBot();

// Make a ref to the document
const ref = admin.firestore().collection("Commands").doc("command");

// Listen for real time updates
ref.onSnapshot((docSnapshot) => {
  if (docSnapshot.exists) {
    console.log(`Received doc snapshot:`, docSnapshot.data());
    const message_type = docSnapshot.get("type");
    let payload = docSnapshot.get("payload");
    if (payload) {
      payload = JSON.parse(payload);
    }
    handleMessage(message_type, payload);
  } else {
    console.log(`Document missing!`);  
  }
}, (err) => {
  console.log(`Encountered error: ${err}`);
});

// Parse the response and DO IT!
function handleMessage(message_type, payload) {
  if (message_type == "motor/go") {
    const leftWheelSpeed = payload[0];
    const rightWheelSpeed = payload[1];
    robot.driveSystem.go(leftWheelSpeed, rightWheelSpeed);
  } else if (message_type == "motor/stop") {
    robot.driveSystem.stop();
  }
}