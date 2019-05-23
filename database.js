var mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect('mongodb+srv://todoapp_user:todoapp123@cluster0-c0pzr.azure.mongodb.net/Memorize?retryWrites=true', {
        useNewUrlParser: true
    });
    if (db){
        console.log("Veritabanına bağlandı.");
    }
}
