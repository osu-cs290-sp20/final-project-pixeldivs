var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var drawingData = require('./artdata.json');

var app = express();
var port = process.env.PORT || 8000;
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
/*
var a = {
  title:"hi",
}
var b = {
  title: "lol",
}
var c = [a, b];*/

/* home page */

app.get('/', function (req, res, next) {
  res.render('homepage', {
		drawing: drawingData,
    home:true,
	});

});

app.get('/drawingpage', function (req, res, next) {
  res.render('drawingpage', {
    home:false,
  });
});

app.get('/drawings/:drawid', function (req, res, next) {
  var drawid = req.params.drawid;
  if (drawingData[drawid]) {
    res.status(200).render('drawingpage', drawingData[drawid]);
  } else {
    next();
  }
});

/* 404 page*/
app.get('*', function (req, res, next) {
  res.status(404).render('404page');

});
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
