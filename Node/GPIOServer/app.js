const express = require("express");

const app = express();
app.use("/", express.static("public"));

app.get("/hello", (req, res) => {
    res.json({
        status: "ok",
        message: "Hello World"
    });
});

app.get("/api/ledon", (req, res) => {
    console.log("TODO: Turn the LED ON");
    res.json({
        status: "ok"
    });
});

app.get("/api/ledoff", (req, res) => {
    console.log("TODO: Turn the LED OFF");
    res.json({
        status: "ok"
    });
});

app.listen(3000);
