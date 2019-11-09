const express = require('express');
const router = express.Router();

//Require Shop model
const Shop = require('../models/shops.js');

//___________________
//7 Restful Routes
//___________________

//New route: GET '/shops/new'
router.get('/new', (req, res) => {
	res.render('shops/new.ejs');
});

//Create route: POST '/shops'
router.post('/', (req, res) => {
	Shop.create(req.body, (err, createdShop) => {
		if (err) console.log('error this is!');
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

//Show route: GET '/shops/:id'
router.get('/:id', (req, res) => {
	Shop.findById(req.params.id, (err, foundShop) => {
		res.render('shops/show.ejs', {
			shop : foundShop
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
router.get('/:id/edit', (req, res) => {
	Shop.findById(req.params.id, (err, foundShop) => {
		//find the shop
		res.render('shops/edit.ejs', {
			shop : foundShop
		});
	});
});

// Update: PUT '/shops/:id'
router.put('/:id', (req, res) => {
	Shop.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedShop) => {
		res.redirect('/shops/' + req.params.id);
	});
});

//Buy Route

router.put('/:id/buy', (req, res) => {
	Shop.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } }, (err, shop) => {
		if (err) {
			console.log(err);
		}
		res.redirect('back');
	});
});

// //Seed route
// router.get('/seed', async (req, res) => {
// 	const newShops = [
// 		{
// 			name        : 'Hello Flowers',
// 			description : 'Sell flowers',
// 			industry    : 'Gifting',
// 			website     : 'www.eatandsip.co',
// 			products    : 'Flower Bouquets',
// 			img         :
// 				'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2'
// 		},
// 		{
// 			name        : 'Bones',
// 			description : "It's just a bag of bones.",
// 			img         : 'http://bluelips.com/prod_images_large/bones1.jpg',
// 			price       : 25,
// 			qty         : 0
// 		},
// 		{
// 			name        : 'Bins',
// 			description : 'A stack of colorful bins for your beans and bones.',
// 			img         : 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
// 			price       : 7000,
// 			qty         : 1
// 		}
// 	];

// 	try {
// 		const seedItems = await Shop.create(newShops);
// 		res.send(seedItems);
// 	} catch (err) {
// 		res.send(err.message);
// 	}
// });

module.exports = router;
