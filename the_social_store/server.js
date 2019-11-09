//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));

/////////////////////////////////////////////////////
// MAKE SURE MIDDLEWARE IS BEFORE CONTROLLER FILES.//
//	THIS WILL SAVE YOU LOTS OF TIME GUYS!          //
/////////////////////////////////////////////////////

//Middleware
app.use(express.urlencoded({ extended: true }));

//To linkController
const productsController = require('./controllers/products.js');
app.use('/products', productsController);

//Mongoose
const mongoURI = 'mongodb://localhost:27017/mongooseStore';

mongoose.connect(
	mongoURI,
	{
		useNewUrlParser    : true,
		useUnifiedTopology : true
	},
	() => {
		console.log('Mongo running at', mongoURI);
	}
);

mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

//Express-session
const session = require('express-session');
app.use(
	session({
		secret            : 'takerbiker shahrani',
		resave            : false,
		saveUninitialized : false
	})
);

//Listener
app.listen(3000, () => {
	console.log('Product list is listening ');
});
