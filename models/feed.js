var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedSchema   = new Schema({
    feedUrl : {type: String},
    title : {type: String},
    link : {type: String},
    description : {type: String},
    author : {type: String},
    entries : [{
        mediaGroup : {type : String},
        title : {type : String},
        link : {type : String},
        content : {type : String},
        contentSnippet : {type : String},
        category : {type : String},
        publishedDate : {type : Date},
        categories : []
    }]
});

module.exports = mongoose.model('Feed', FeedSchema);
