const express = require('express');
const router = express.Router();

//Require Shop and product model
const Shop = require('../models/shops.js');
const Product = require('../models/products.js');

//___________________
//7 Restful Routes
//___________________

//CHECKED
//New route: GET '/shops/new'
router.get('/new', (req, res) => {
	res.render('shops/new.ejs', {});
});

//CHECKED
//Create route: POST '/shops'
router.post('/', (req, res) => {
	Shop.create(req.body, (err, createdShop) => {
		if (err) console.log('error this is with create route!');
		res.redirect('/shops');
	});
});

//Index route: GET '/shops'
router.get('/', (req, res) => {
	Shop.find({}, (err, allShops) => {
		res.render('shops/index.ejs', {
			shops : allShops
		});
	});
});

//Delete route: DELETE '/shops/:id'
router.delete('/:id', (req, res) => {
	Shop.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/shops');
	});
});

//Edit route: GET '/shops/:id/edit'
// router.get('/:id/edit', (req, res) => {
// 	Shop.findById(req.params.id, (err, foundShop) => {
// 		//find the shop
// 		res.render('shops/edit.ejs', {
// 			shop : foundShop
// 		});
// 	});
// });

//Edit route
router.get('/:id/edit', (req, res) => {
	Shop.findById(req.params.id).populate('products').exec((err, foundShop) => {
		console.log(foundShop);

		Product.find({}, (err, foundProducts) => {
			res.render('shops/edit.ejs', {
				shop     : foundShop,
				products : foundProducts
			});
		});
	});
});

// Update: PUT '/shops/:id'
router.put('/:id', (req, res) => {
	Shop.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedShop) => {
		res.redirect('/shops/' + req.params.id);
	});
});

// //Buy Route
// router.put('/:id/buy', (req, res) => {
// 	Shop.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } }, (err, shop) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.redirect('back');
// 	});
// });

//D
//Show route: GET '/shops/:id'
router.get('/:id', (req, res) => {
	Shop.findById(req.params.id).populate('products').exec((err, foundShop) => {
		if (err) {
			console.log('error: ', err);
		}
		res.render('shops/show.ejs', {
			shop : foundShop
		});
	});
});

module.exports = router;
