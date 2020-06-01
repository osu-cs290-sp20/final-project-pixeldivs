
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 8000;
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

var a = {
  title:"hi",
}
var b = {
  title: "lol",
}
var c = [a, b];

/* home page */
app.get('/', function (req, res, next) {
  res.render('homepage', {
		drawing: c,
	});

});

/* 404 page*/
app.get('*', function (req, res, next) {
  res.status(404).render('404page');

});
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
