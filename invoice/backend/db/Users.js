const mongoose = require("mongoose");

const User = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    uname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("users", User);
