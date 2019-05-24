var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');

var wordsToMemorizeSchema = new mongoose.Schema({
    englishWord: String,
    turkishWord: String,
    type: String,
    sentence: String,
    userEmail: String,
    target: String,
    status: Number,
    date: Date
});
var WordsToMemorize = mongoose.models.wordsToMemorize || mongoose.model('wordsToMemorize', wordsToMemorizeSchema);

var urlEncodedParser = bodyParser.urlencoded({
    extended: true
});
module.exports = function (app) {
    app.use(session({
        secret: "Secret Key",
        resave: false,
        saveUninitialized: true
    }));
   
    app.get('/statistics',function(req,res){
        WordsToMemorize.find({userEmail:req.session.email,status:4}, function (err, data) {
            res.render('statistics',{data: data});
        });

    })
};
