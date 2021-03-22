const express = require("express");
const Gpio = require("pigpio").Gpio;

const app = express();
app.use("/", express.static("public"));

// Pin setup

const led = new Gpio(14, {mode: Gpio.OUTPUT});
const pushbutton = new Gpio(25, {mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP});


app.get("/hello", (req, res) => {
    res.json({
        status: "ok",
        message: "Hello World"
    });
});

app.get("/api/ledon", (req, res) => {
    console.log("Turn the LED ON");
    led.digitalWrite(1);
    res.json({
        status: "ok"
    });
});

app.get("/api/ledoff", (req, res) => {
    console.log("Turn the LED OFF");
    led.digitalWrite(0);
    res.json({
        status: "ok"
    });
});

app.listen(3000);
