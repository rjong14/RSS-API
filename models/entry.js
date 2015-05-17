var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrySchema   = new Schema({
    mediaGroup : {type : String},
    title : {type : String},
    link : {type : String},
    content : {type : String},
    contentSnippet : {type : String},
    category : {type : String},
    publishedDate : {type : Date},
    categories : []
});

module.exports = mongoose.model('Entry', EntrySchema);