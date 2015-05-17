var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedSchema   = new Schema({
    feedUrl : {type: String},
    title : {type: String},
    link : {type: String},
    description : {type: String},
    author : {type: String},
    entries : [{type: Schema.Types.ObjectId, ref: 'Entry'}]
});

module.exports = mongoose.model('Feed', FeedSchema);
