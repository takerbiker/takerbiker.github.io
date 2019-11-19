const express = require('express');
const router = express.Router();
const Product = require('../models/products.js');
const Shop = require('../models/shops.js');

//___________________
//7 Restful Routes
//___________________

router.get('/', (req, res) => {
	Product.find({}, (err, allProducts) => {
		res.render('products/index.ejs', {
			products : allProducts
		});
	});
});

router.get('/new', (req, res) => {
	res.render('products/new.ejs');
});

router.post('/', (req, res) => {
	Product.create(req.body, (err, createdProduct) => {
		res.redirect('/products');
	});
});

router.delete('/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, () => {
		res.redirect('/products');
	});
});

//Edit route
router.get('/:id/edit', (req, res) => {
	Product.findById(req.params.id).populate('shop').exec((err, foundProduct) => {
		console.log(foundProduct);

		Shop.find({}, (err, foundShops) => {
			res.render('products/edit.ejs', {
				product : foundProduct,
				shops   : foundShops
			});
		});
	});
});

//Update
router.put('/:id', (req, res) => {
	Product.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/products');
	});
});

//Show route
router.get('/:id', (req, res) => {
	Product.findById(req.params.id).populate('shop').exec((err, foundProduct) => {
		if (err) {
			console.log('error: ', err);
		}
		console.log(foundProduct);
		res.render('products/show.ejs', {
			product : foundProduct
		});
	});
});

module.exports = router;
