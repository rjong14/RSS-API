var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username : {type: String, required: true},
    password : {type: String, required: false},
    feed : [{type: Schema.Types.ObjectId, ref: 'Feed'}]
    
});

module.exports = mongoose.model('User', UserSchema);
