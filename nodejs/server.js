const express = require('express');
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");

// DB Configuration
mongoose
    .connect("mongodb://localhost:27017/countryDB", {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(chalk.blue("MongoDB connection successfull"));
    })
    .catch((err) => {
        console.log(chalk.red("Connection error occurred..." + err));
    });


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/uploads", express.static(__dirname + "/uploads"));
const http = require("http");
const nodeStatic = require("node-static");
const fileServer = new nodeStatic.Server("./uploads");
http.createServer((req, res) => {
    fileServer.serve(req, res);
});

// Cores config
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    next();
})

// Routes
app.use("/country", require("./country/country"));


app.get("/", (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            message: "Api working well, please use another route to get data"
        });
});

app.get("*", (req, res) => {
    res
        .status(403)
        .json({
            success: false,
            message: "This route is not exists"
        });
});


const port = process.env.PORT || 4545;
app.listen(port, () => {
    console.log(chalk.green(`listening on http://localhost:${port}`));
});
