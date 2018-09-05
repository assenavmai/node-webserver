const express = require('express');
const hbs = require('hbs');
const  fs = require('fs');

var app = express();

// middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// logger
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log.');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


// helpers
hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
// routes 
app.get('/', (req, res) => {
	// render templates with the view engine
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to my site'
	});
});

app.get('/about', (req, res) => {
	// render templates with the view engine
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMsg: 'Unable to handle request'
	});
});

// bind application to port on machine - 3000 local dev
app.listen(3000, () => {
	console.log('Server is up on port 3000.')
});