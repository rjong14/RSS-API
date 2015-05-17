var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema   = new Schema({
    username : {type: String, required: true},
    password : {type: String, required: false},
    feed : [{type: Schema.Types.ObjectId, ref: 'Feed'}]
    
});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
