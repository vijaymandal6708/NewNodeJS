const mongoose = require("mongoose");

const adminSchema= new mongoose.Schema({
    adminEmail:String,
    adminPassword:String
})

module.exports = mongoose.model("admin", adminSchema);