const Product = require("../../../models/Product");


async function GET(context) {
  context.log("GET.js aloitetaan...");

  const products = await Product.find();
  return { status: 200, jsonBody: products };
}


module.exports = { GET };
