var express = require('express');
var router = express.Router()
var Feed = require('../models/feed.js');
var Entry = require('../models/entry.js');
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
    Feed.find()
        .populate('entries')
        .exec(function(err, feeds){
        if(err) {
            hresp.ErrorFind(res, err);
        }
        hresp.SuccessFind(res, feeds);
    });
});

router.get('/feed/:feedId', function(req, res){
    Feed.findById(req.params.feedId)
        .populate('entries')
        .exec(function(err, feed){
        if (err) {
            hresp.ErrorFind(res, err);
        }
        hresp.SuccessFind(res, feed);
    })
});

router.get('/feed/:feedId/entry/:entryId', function(req, res){
    Entry.findById(req.params.entryId, function (err, entry) {
        if (err){
            hresp.ErrorFind(res, err);
        }
        if(entry==null){
            hresp.ErrorFind(res, "Object not found")
        }else{
            hresp.SuccessFind(res, entry);
        }
    });
    
    //below code "where" is a everything or nothing trigger, wtf mongoose?
    //Feed
    //.findById(req.params.feedId)
    //.where('entries._id').equals(req.params.entryId)
    //.limit(2)
    //.exec(function(err, entry){
    //    if (err){
    //        hresp.ErrorFind(res, err);
    //    }
    //    hresp.SuccessFind(res, entry);
    //});
});

module.exports = router;