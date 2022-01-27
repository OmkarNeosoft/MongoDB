const mongoose = require("mongoose");

const Invoices = mongoose.Schema({
    innumber: { type: Number, required: true },
    recname: { type: String, required: true },
    recaddress: { type: String, required: true },
    recemail: { type: String, required: true },
    recmobile: { type: Number, required: true },
    indate: { type: String, required: true },
    duedate: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model("invoices", Invoices);
