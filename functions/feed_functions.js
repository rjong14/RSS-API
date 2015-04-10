var Feed = require('../models/feed.js');
var gfeed = require('google-feed-api');

module.exports = {
    updateFeeds: function() {
        Feed.find(function(err, feedsRAW){
            
            console.log(feedsRAW[0].feedUrl);
            for (a = 0; a < feedsRAW.length; a++) {
                fillFeed(feedsRAW[a]);
            }
        });
        
        function fillFeed(feedsRAW) {
            feedsRAW.save(function(err){
                if (err)
                    console.log(err);
            });
            
            var thisFeed = new gfeed.Feed(feedsRAW.feedUrl);
            thisFeed.setNumEntries(10);
            thisFeed.load(function(result) {
                if (!thisFeed.error) {
                    for (i = 0; i < result.feed.entries.length;  i++) {
                        fillSpecificFeed(feedsRAW, result.feed.entries[i]);
                    }
                } else {
                    console.log("error");
                }
            });
            
        };
        
        function fillSpecificFeed(feedsRAW, entry) {
            var nieuwEntry = {
                title: entry.title,
                link: entry.link,
                publishedDate: entry.publishedDate,
                contentSnippet: entry.contentSnippet,
                content: entry.content,
                categories: entry.categories,
            };
            
            
            feedsRAW.update(
                { $push: { entries : nieuwEntry } }, function (err) {
                    if (err)
                        console.log(err);
                });
        };
    }
};