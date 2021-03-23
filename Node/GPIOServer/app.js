const express = require("express");
const Gpio = require("pigpio").Gpio;

const app = express();
app.use("/", express.static("public"));

// Pin setup

const redLed = new Gpio(14, {mode: Gpio.OUTPUT});
const yellowLed = new Gpio(15, {mode: Gpio.OUTPUT});
const greenLed = new Gpio(18, {mode: Gpio.OUTPUT});
const pushbutton = new Gpio(25, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP});


app.get("/hello", (req, res) => {
    res.json({
        status: "ok",
        message: "Hello World"
    });
});

app.get("/api/ledon", (req, res) => {
    console.log("Turn the LED ON");
    redLed.digitalWrite(1);
    res.json({
        status: "ok"
    });
});

app.get("/api/ledoff", (req, res) => {
    console.log("Turn the LED OFF");
    redLed.digitalWrite(0);
    res.json({
        status: "ok"
    });
});

function setLed(color, value) {
    if (color == "r") {
        redLed.digitalWrite(value);
    }
    if (color == "y") {
        yellowLed.digitalWrite(value);
    }
    if (color == "g") {
        greenLed.digitalWrite(value);
    }
}

app.get("/api/ledon/:color", (req, res) => {
    const color = req.params.color;
    console.log("Turn the LED ON for " + color);
    setLed(color, 1);
    res.json({
        status: "ok"
    });
});

app.get("/api/ledoff/:color", (req, res) => {
    const color = req.params.color;
    console.log("Turn the LED OFF for " + color);
    setLed(color, 0);
    res.json({
        status: "ok"
    });
});


app.get("/api/read", (req, res) => {
    console.log("Return the value of the pushbutton");
    res.json({
        isHigh: pushbutton.digitalRead()
    });
});

app.listen(3000);
