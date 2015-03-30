module.exports = function(router, User, Feed, hresp){
    
    router.route('/users')
    .post(function(req, res){
        var user = new User();
        //TODO: uitbreiden met authenticatie
        user.username = req.body.username;
        
        user.save(function(err){
            if(err){
                hresp.ErrorSaving(res, err);
            }
            hresp.SuccessSaving(res, user);
        });
    })
    .get(function(req, res){
        User.find(function(err, users){
            if(err) {
                hresp.ErrorFind(res, err);
            }
            hresp.SuccessFind(res, users);
        });
    });
    
    router.route('/users/:id')
    .get(function(req, res){
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
    .put(function(req, res){
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
    })            
    .delete(function(req, res) {
        User.remove({
            _id: req.params.id
        }, function(err, user){
            if(err){
                hresp.ErrorDelete(res, err);
            }
            hresp.SuccessDelete(res);
        });
    });
            
    router.route('/users/:id/feed')
    .post(function(req, res){
        Feed.findOne({ rssLink: req.body.rssLink}, function(err, newFeed) {
            if(!newFeed) {
                var newFeed = new Feed();
                newFeed.title = req.body.title;
                newFeed.description = req.body.description;
                newFeed.rssLink = req.body.rssLink;
                
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
    
    return router;
}