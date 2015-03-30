var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username : {type: Text, required: 'true'},
    password : {type: Text, required: 'false'},
    subscriptions : [{
        feed : [{type: Schema.Types.objectId, ref: 'Feed'}]
    ]}
});

module.exports = mongoose.model('User', ChatSchema);
