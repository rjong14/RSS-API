var express = require('express');
var router = express.Router()
var Feed = require('../models/feed.js');
var hresp = require('../functions/response.js');

router.post('/feed', function(req, res){
    var feed = new Feed();
    feed.title = req.body.title;
    feed.description = req.body.description;
    feed.rssLink = req.body.rssLink;
    
    feed.save(function(err){
        if(err){
            hresp.ErrorSaving(res, err);
        }
        hresp.SuccessSaving(res, feed);
    });
});

router.get('/feed', function(req, res){
    Feed.find(function(err, feeds){
        if(err) {
            hresp.ErrorFind(res, err);
        }
        hresp.SuccessFind(res, feeds);
    });
});

module.exports = router;