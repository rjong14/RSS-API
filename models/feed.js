var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedSchema   = new Schema({
    title,
    discription,
    Entry : [{
        title : {type : String},
        link : {type : String},
        category : {type : String},
        author : {type : String},
        comments : {type : String}
    }]
});

module.exports = mongoose.model('Feed', FeedSchema);
