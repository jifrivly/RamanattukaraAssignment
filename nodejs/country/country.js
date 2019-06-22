const express = require("express");
const multer = require("multer");

const countryModel = require("./countryModel");

const country = express.Router();

// multer config
var upload = multer({ dest: "uploads/" });


var newCountry;


country.get("/", (req, res) => {
    res
        .status(200)
        .json({
            succes: true,
            message: "Use /list or /add or /edit"
        });
});

country.post("/add", (req, res) => {
    console.log("/add worked");
    this.newCountry = new countryModel({
        name: req.body.name,
        code: req.body.code,
        currency: req.body.currency,
        fileName: null,
        status: req.body.status
    });
    res.status(200).json({
        success: true,
        message: "add route worked"
    });
});

country.post("/upload", upload.single("countryFlag"), (req, res) => {
    console.log(req.file);
    this.newCountry.fileName = req.file.filename;
    this.newCountry
        .save()
        .then((addedData) => {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Added",
                    data: addedData
                });
        })
        .catch(err => {
            res
                .status(203)
                .json({
                    success: false,
                    message: "Not Added Error Occurred",
                    data: err
                });
        });

});

country.get("/list", (req, res) => {
    countryModel.find((err, countryList) => {
        if (err) {
            res
                .status(203)
                .json({
                    success: false,
                    message: "Error occurred",
                    data: err
                });
        };
        if (countryList) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Country list",
                    data: countryList
                });
        } else {
            res
                .status(203)
                .json({
                    success: false,
                    message: "No Country List Found...",
                    data: null
                });
        }
    });

});

country.get("/edit", (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            message: "edited"
        });
});


module.exports = country;