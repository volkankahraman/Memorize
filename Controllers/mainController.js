var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');


var wordSchema = new mongoose.Schema({
    englishWord: String,
    turkishWord: String,
    type: String,
    sentence: String
});

var Word = mongoose.model('Words', wordSchema);



var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

function saveCount(req) {
    if (req.session.pageCount) {
        req.session.pageCount++;
    } else {
        req.session.pageCount = 1;
    }
}
module.exports = function (app) {
    app.use(session({
        secret: "Secret Key",
        resave: false,
        saveUninitialized: true
    }));
    

    app.get('/', function (req, res) {
        req.session.email = "admin@admin.com";
        req.session.password = "admin";
        req.session.type = 1;
        if (req.session.email) {
            Word.find({}, function (err, data) {
                if (err) throw err;
                //res.send(data);
                res.render('index', {
                    data: data,
                    pageCount: req.session.pageCount,
                    session:req.session
                });
            });
        } else {
            res.redirect('/login');
        }
        saveCount(req);
    });
    app.delete('/delete/:id', function(req,res){
        console.log();
        //delete item from the view and add it to mongoDb
        Word.find({_id:req.params.id}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.post('/', urlEncodedParser, function (req, res) {
        Word(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
    app.get('/about', function (req, res) {
        res.render('about');
    });
    app.get('/logout', function (req, res) {
        console.log(req.session.email+"Çıkmaya çalıştı");
        req.session.email = null;
        req.session.password = null;
        res.redirect('/login');
    })
};