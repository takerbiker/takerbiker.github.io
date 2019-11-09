const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
	name        : { type: String, required: true },
	description : String,
	type        : String,
	products    : String,
	website     : String,
	img         : String
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
