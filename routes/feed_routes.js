module.exports = function(routes, Feed, hresp) {
    
    router.route('/feed')
    .post(function(req, res){
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
    })
    .get(function(req, res){
        Feed.find(function(err, feeds){
            if(err) {
                hresp.ErrorFind(res, err);
            }
            hresp.SuccessFind(res, feeds);
        });
    });
    
    return router;
}