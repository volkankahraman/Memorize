var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});


var memberSchema = new mongoose.Schema({
    email: String,
    password: String,
    type: Number
});
var member = {
    email: "admin@admin.com",
    password: "admin",
    type: 1
}


var Member = mongoose.model('Members', memberSchema);
module.exports = function (app) {
    app.use(session({
        secret: "Secret Key",
        resave: false,
        saveUninitialized: true
    }));
    app.get('/login', function (req, res) {
        if (req.session.email) {
            res.redirect('/');
        } else
            res.render('login');
    });
    app.post('/login', urlEncodedParser, function (req, res) {
        Member.find({email: req.body.email,password: req.body.password}, function (err, data) {
            if(data[0]!=null){
                req.session.email = data[0].email;
                req.session.password = data[0].password;
                req.session.type = data[0].type;
            }
            
            if (err) throw err;
            res.json(data);

        });

    });
    app.post('/register', urlEncodedParser, function (req, res) {
        Member(req.body).save(function (err, data) {
            if (err) throw err;

            res.json(data);

        });
    });
};