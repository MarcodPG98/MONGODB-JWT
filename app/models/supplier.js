const mongoose = require("mongoose");

const Supplier = mongoose.model(
  "Supplier",
  new mongoose.Schema({
    fullname: String,
    productname: String,
    description: String,
    amount: Number,
    price: String,
  })
);

module.exports = Supplier;