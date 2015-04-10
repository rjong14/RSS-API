var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Feed = require('../models/feed.js');
var hresp = require('../functions/response.js');
    
router.post('/users', function(req, res){
    var user = new User();
    //TODO: uitbreiden met authenticatie
    user.username = req.body.username;
    
    user.save(function(err){
        if(err){
            hresp.ErrorSaving(res, err);
        } else {
        hresp.SuccessSaving(res, user);
        }
    });
});

router.get('/users', function(req, res){
    User.find(function(err, users){
        if(err) {
            hresp.ErrorFind(res, err);
        } else {
        hresp.SuccessFind(res, users);
        }
    });
});

router.get('/users/:id', function(req, res){
    User.findById(req.params.id)
    .populate('feed')
    .exec(function(err, user) {
        if(err){
            hresp.ErrorFind(res, err);
            return;
        }
        hresp.SuccessFind(res, user);
    });
})

router.put('/users/:id', function(req, res){
    User.findById(req.params.id, function(err, user) {
        if(err){
            hresp.ErrorFind(res, err);
            return;
        }
        user.username = req.body.username;
        user.save(function(err, user) {
            if(err) {
                hresp.ErrorSaving(res, err);
            }
            hresp.SuccessSaving(res,user)
        });
    });
});

router.delete('/users/:id', function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user){
        if(err){
            hresp.ErrorDelete(res, err);
        }
        hresp.SuccessDelete(res);
    });
});

router.post('/users/:id/feed', function(req, res){
    Feed.findOne({ rssLink: req.body.rssLink}, function(err, newFeed) {
        if(!newFeed) {
            var newFeed = new Feed();
            newFeed.title = req.body.title;
            newFeed.description = req.body.description;
            newFeed.link = req.body.link;
            newFeed.feedUrl = req.body.feedUrl;
            
            newFeed.save(function(err, user) {
                if(err) {
                    hresp.ErrorSaving(res, err)
                    return;
                }
            });
        }
        User.findById(req.params.id, function(err, user) {
            if(err) {
                hresp.ErrorFind(res, err)
                return;
            }
            user.update(
            { $push: { feed : newFeed._id } }, function (err) {
                if (err){
                    hresp.ErrorUpdate(res, err);
                    return;
                }
                hresp.SuccessSaving(res, user);
            });
        });
    });
});

module.exports = router;