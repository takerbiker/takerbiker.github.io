//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();

/////////////////////////////////////////////////////
// MAKE SURE MIDDLEWARE IS BEFORE CONTROLLER FILES.//
//	THIS WILL SAVE YOU LOTS OF TIME GUYS!          //
/////////////////////////////////////////////////////

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
	session({
		secret            : process.env.SECRET,
		resave            : false,
		saveUninitialized : false
	})
);

//To link Controllers
const shopsController = require('./controllers/shops.js');
app.use('/shops', shopsController);

const productsController = require('./controllers/products.js');
app.use('/products', productsController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const userController = require('./controllers/users.js');
app.use('/users', userController);

//Database
const mongoURI = 'mongodb://localhost:27017/theSocialStore';

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

//Index
app.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser : req.session.currentUser
	});
});

app.get('/shops', (req, res) => {
	if (req.session.currentUser) {
		res.render('/index.ejs');
	} else {
		res.redirect('/sessions/new');
	}
});

app.get('/about', (req, res) => {
	if (req.session.currentUser) {
		res.render('/about.ejs');
	} else {
		res.redirect('/about.ejs');
	}
});

//Listener
app.listen(3000, () => {
	console.log('The Social Store is listening ');
});
