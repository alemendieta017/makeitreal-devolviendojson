const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
}));

app.get("/products", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (e) {
    console.error(e);
  }
});

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
