var Feed = require('../models/feed.js');
var gfeed = require('google-feed-api');

module.exports = {
    updateFeeds: function() {
        Feed.find(function(err, feedsRAW){
            
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
                    for (i = 0; i < result.feed.entries.length;  i++) {
                        //standaard toevoegen
                        var toevoegen = true;
                        //voor elke bestaande entry
                        for (j = 0; j < feedsRAW.entries.length; j++){
                            //controlleren of hij overeen komt met de bestaande entry
                            if(feedsRAW.entries[j].content == result.feed.entries[i].content) {
                                //zo ja niet toevoegen
                                toevoegen = false;
                            };
                        };
                        
                        //anders wel toevoegen
                        if (toevoegen == true) {
                            console.log("inserting new entry");
                            console.log(result.feed.entries[i].title);
                            fillSpecificFeed(feedsRAW, result.feed.entries[i]);
                        }
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