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

var KnownWordSchema = new mongoose.Schema({
    wordId: String,
    userEmail: String,
    status: Number,
    date: Date
});

var WordsToMemorize = mongoose.models.wordsToMemorize || mongoose.model('wordsToMemorize', wordsToMemorizeSchema);

var Word = mongoose.models.Words || mongoose.model('Words', wordSchema);



var urlEncodedParser = bodyParser.urlencoded({
    extended: true
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
    app.get('/memorize', function (req, res) {
        res.render('userSide', {
            target:null,
            data: [],
            pageCount: req.session.pageCount,
            session: req.session
        });
    });
    app.get('/englishWords', function (req, res) {
        WordsToMemorize.find({}, function (err, data) {
            res.render('userSide', {
                target:'english',
                data: data,
                pageCount: req.session.pageCount,
                session: req.session
            });
        });
    });
    app.post('/englishWords',urlEncodedParser, function (req, res) {

        req.body.selectedWords.forEach(element => {
            console.log(element);
            WordsToMemorize.find({_id:element}, function (err, data) {
            var knownWorddata={
                wordId:element,
                englishWord:data[0].englishWord,
                turkishWord:data[0].turkishWord,
                type: data[0].type,
                sentence: data[0].sentence,
                target:"english",
                userEmail:req.session.email,
                status:0,
                date:new Date()
            };
            WordsToMemorize(knownWorddata).save(function (err, data) {
                if (err) throw err;
                console.log(data);
            });
            });
        });

        res.json(req.body);

    });
    app.get('/turkishWords', function (req, res) {
        WordsToMemorize.find({}, function (err, data) {
            res.render('userSide', {
                target:'turkish',
                data: data,
                pageCount: req.session.pageCount,
                session: req.session
            });
        });
    });
    app.post('/turkishWords',urlEncodedParser, function (req, res) {

        req.body.selectedWords.forEach(element => {
            console.log(element);
            WordsToMemorize.find({_id:element}, function (err, data) {
            var knownWorddata={
                wordId:element,
                englishWord:data[0].englishWord,
                turkishWord:data[0].turkishWord,
                type: data[0].type,
                sentence: data[0].sentence,
                target:"turkish",
                userEmail:req.session.email,
                status:0,
                date:new Date()
            };
            WordsToMemorize(knownWorddata).save(function (err, data) {
                if (err) throw err;
                console.log(data);
            });
            });
        });

        res.json(req.body);

    });
    
    app.get('/learningWords', function (req, res) {
        
        WordsToMemorize.find({userEmail:req.session.email,status:{$in: [0,1,2,3]}}, function (err, data) {
            res.render('userSide', {
                target:'learningWords',
                data: data,
                pageCount: req.session.pageCount,
                session: req.session
            });
        });
    });
    app.post('/learningWords',urlEncodedParser, function (req, res) {
            
            WordsToMemorize.findById(req.body.id, function (err, word) { 
                if(word.englishWord == req.body.txt || word.turkishWord == req.body.txt){
                    WordsToMemorize.findByIdAndUpdate(
                            word._id,
                            {status:parseInt(req.body.level)+1},
                            {new: true},
                            (err,word) => {
                                console.log(word);
                                res.json(word);
                            }
                    )
                }else{
                    WordsToMemorize.findByIdAndUpdate(
                        word._id,
                        {status:0},
                        {new: true},
                        (err,word) => {
                            console.log(word);
                            res.json(word);
                        }
                )
                }
             } );
    });
    app.get('/learnedWords', function (req, res) {
        
        WordsToMemorize.find({userEmail:req.session.email,status:4}, function (err, data) {
            res.render('userSide', {
                target:'learnedWords',
                data: data,
                pageCount: req.session.pageCount,
                session: req.session
            });
        });
    });
};
