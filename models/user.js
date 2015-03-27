var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name : {type: Text},

});

module.exports = mongoose.model('User', ChatSchema);
