const express = require("express");
const multer = require("multer");

const countryModel = require("./countryModel");

const country = express.Router();

// multer config
var upload = multer({ dest: "uploads/" });


var newCountry;

// Main route
country.get("/", (req, res) => {
    res
        .status(200)
        .json({
            succes: true,
            message: "Use /list or /add or /edit"
        });
});


// Uploading new country
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


// Saving new country to mongo
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


// details of country by id
country.get("/get/:id", (req, res) => {
    var id = req.params.id;

    countryModel.findOne({ _id: id }, (err, country) => {
        if (err) {
            console.log("error occurred while fetching country by id..." + err);
            res.json({
                success: false,
                message: "An error occurred in query.. No data fetched",
                error: err
            });
        }
        if (country) {
            console.log("Country data fetched");
            res.status(200).json({
                success: true,
                message: "Country data successfully fetched",
                data: country
            })
        }
    });
});


// Listing countries
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

// Edit country
country.post("/edit", (req, res) => {
    var data1 = {};
    console.log("Edit country route working..")

    // this.newCountry = new countryModel(req.body);
    console.log(req.body.id)
    console.log(req.body.newCountryData)
    // console.log(JSON.parse(req.body.newCountryData))
    i = 0;

    for (let i = 0; i < req.body.newCountryData.length; i++) {
        const element = req.body.newCountryData[i];
        // console.log(Object.keys(element));
        let key = Object.keys(element);
        data1[key] = element[key]
    }
    console.log(data1);

    countryModel.updateOne({ _id: req.body.id }, { $set: data1 },
        (err, data) => {
            if (err) {
                console.log("Country data updation failed..");
                res.json({
                    success: false,
                    message: "An error occurred when updating country data",
                    error: err
                });
            } else {
                if (data) {
                    res.json({
                        success: true,
                        message: "Country data successfully updated",
                        data: data
                    });
                }
            }
        })
});


// delete country
country.post("/delete", (req, res) => {
    console.log("Delete country Worked")
    var id = req.body.id;
    console.log(id)
    countryModel.findByIdAndDelete(id, (err, data) => {
        if (err) {
            console.log("Error occurred" + err);
            res
                .status(403)
                .json({
                    success: false,
                    message: "Error occurred : " + err,
                    error: err
                });
        }
        if (data) {
            res
                .status(200)
                .json({
                    success: true,
                    message: "Country deleted..."
                });
        }
    });

});

module.exports = country;