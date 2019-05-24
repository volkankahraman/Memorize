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
        if (req.session.email) {
            
            if(!req.session.type){
                res.redirect('/memorize');
            }else{
                WordsToMemorize.find({userEmail:"admin@admin.com"}, function (err, data) {
                if (err) throw err;
                //res.send(data);
                res.render('index', {
                    data: data,
                    pageCount: req.session.pageCount,
                    session:req.session
                });
            });
        }
        } else {
            res.redirect('/login');
        }
        saveCount(req);
    });
    app.delete('/delete/:id', function(req,res){
        console.log();
        //delete item from the view and add it to mongoDb
        WordsToMemorize.find({_id:req.params.id,userEmail:'admin@admin.com'}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.post('/', urlEncodedParser, function (req, res) {
        WordsToMemorize(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
    app.get('/about', function (req, res) {
        res.render('about');
    });
    app.get('/logout', function (req, res) {
        console.log(req.session.email+" Çıkmaya çalıştı");
        req.session.email = null;
        req.session.password = null;
        res.redirect('/login');
    })
};