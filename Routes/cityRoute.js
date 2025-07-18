var express = require("express")
var router = express.Router()
const {  getAllCities } = require("../API_Controller/cityController")

router.get("/", getAllCities)


module.exports = router
