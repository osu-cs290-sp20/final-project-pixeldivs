var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var drawingData = require('./artdata.json');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.render('homepage', {
		drawing: drawingData,
    home:true,
    alreadyCreated:true
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

app.post('/home/save', function(req, res, next){
  drawingData.push(req.body)
  fs.writeFileSync('./artdata.json', JSON.stringify(drawingData));
  res.status(200).send("Drawing successfully added");
})

app.post('/drawings/:drawid/save', function (req, res, next) {
  var drawid = req.params.drawid;
  var id = parseInt(drawid)
  drawingData[id].pixels = req.body.pixels
  fs.writeFileSync('./artdata.json', JSON.stringify(drawingData));
  res.status(200).send("Drawing successfully added");
 
});

