var Feed = require('../models/feed.js');
var Entry = require('../models/entry.js')
var gfeed = require('google-feed-api');

module.exports = {
    updateFeeds: function() {
        Feed.find()
        .populate('entries')
        .exec(function(err, feedsRAW){
            
            for (a = 0; a < feedsRAW.length; a++) {
                fillFeed(feedsRAW[a]);
            }
        });
        
        function fillFeed(feedsRAW) {            
            var thisFeed = new gfeed.Feed(feedsRAW.feedUrl);
            thisFeed.setNumEntries(10);
            thisFeed.load(function(result) {
                if (!thisFeed.error) {
                    //voor elke nieuwe entry
                    result.feed.entries.forEach(function(newEntry) {
                        Entry.findOne()
                            .where('content').equals(newEntry.content)
                            .exec(function(err, entry){
                            if (!entry){
                                console.log("inserting new entry:");
                                console.log(newEntry.title);
                                fillSpecificFeed(feedsRAW, newEntry);
                                }
                        });
                    })
                } else {
                    console.log("error getting feeds from google");
                }
            });
            
        };
        
        function fillSpecificFeed(feedsRAW, entry) {
            var nieuwEntry = new Entry();
            nieuwEntry.title = entry.title;
            nieuwEntry.link = entry.link;
            nieuwEntry.publishedDate = entry.publishedDate;
            nieuwEntry.contentSnippet = entry.contentSnippet;
            nieuwEntry.content = entry.content;
            nieuwEntry.categories = entry.categories;
            
            
            nieuwEntry.save(function(err){
                if (err){
                    console.log('error saving entry');
                }
            });
            
            feedsRAW.update(
                { $push: { entries : nieuwEntry._id } }, function (err) {
                    if (err)
                        console.log(err);
                });
        };
    },
    
    emptyFeeds: function(){
        Feed.find(function(err, feedsRAW){
            for (a = 0; a < feedsRAW.length; a++) {
                //feedsRAW[a].entries = undefined;
                //this code deletes last, need to delete first
                //while (feedsRAW[a].entries.length > 25)
                //{
                //    console.log("deleting");
                //    feedsRAW[a].entries.pop();
                //}
                feedsRAW[a].save(function(err){
                    if (err){
                        console.log("error saving")
                    }
                    console.log('saving')
                });
            }
        });
    }
};