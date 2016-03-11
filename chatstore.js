/**
 * Created by viktorlarsson on 2016-03-01.
 */


var mongoose = require('mongoose');

var chatstores = function () {

    var chatstore = mongoose.Schema({
        analyticsID: String,
        date: {type: Date, default: new Date()},
        msg: String,
        temporaryname : String
    });


    return mongoose.model('chatstore', chatstore);
};

module.exports = new chatstores();


