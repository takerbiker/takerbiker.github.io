const express = require('express');
const router = express.Router();
const Product = require('../models/products.js');

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

//edit
router.get('/:id/edit', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('products/edit.ejs', {
			product : foundProduct
		});
	});
});

router.put('/:id', (req, res) => {
	Product.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/products');
	});
});

router.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('products/show.ejs', {
			product : foundProduct
		});
	});
});

module.exports = router;
