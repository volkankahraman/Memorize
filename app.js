var express = require('express');

var database = require(__dirname + '/database.js');
var mainController = require(__dirname + '/Controllers/mainController.js');
var loginController = require(__dirname + '/Controllers/loginController.js');

var app = express();


app.set('view engine','ejs');

app.use(express.static(__dirname + '/Views'));

database();
mainController(app);
loginController(app);
app.use(function(req, res, next) {
    return res.render('404');
  });
app.listen(3000);
console.log("3000 Portundan dinleniyor.");