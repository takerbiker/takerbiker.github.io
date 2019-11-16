const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
	item        : String,
	description : String,
	price       : Number,
	img         : String,
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
