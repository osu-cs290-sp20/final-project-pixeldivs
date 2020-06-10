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
	});

});

app.get('/drawingpage', function (req, res, next) {
  res.render('drawingpage', {
    home:false,
  });

});
/* 404 page*/
app.get('*', function (req, res, next) {
  res.status(404).render('404page');

});
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

app.post('/home/save', function(req, res, next){
  console.log(req.body);
 drawingData.push(req.body)
 console.log('drawing data ****', drawingData);
 fs.writeFileSync('./artdata.json', JSON.stringify(drawingData));
 res.status(200).send("Drawing successfully added");
})

app.post('/drawingpage/save', function(req, res, next){
  console.log(req.body);
  var i = 0;
 drawingData[i]= req.body
 console.log('drawing data ****', drawingData);
 fs.writeFileSync('./artdata.json', JSON.stringify(drawingData));
 res.status(200).send("Drawing successfully added");
})

