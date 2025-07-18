const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  effectedDate:Date,  
});

const cities = mongoose.model("cities", citySchema);
module.exports = cities;