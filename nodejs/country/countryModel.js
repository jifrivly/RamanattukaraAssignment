const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name: String,
    code: Number,
    currency: String,
    fileName: String,
    status: String
});


module.exports = mongoose.model("country", countrySchema);