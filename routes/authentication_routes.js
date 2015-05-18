var express = require('express');
var router = express.Router();
var passport = require('passport');
var hresp = require('../functions/response');
var User = require('../models/user.js');

router.post('/login',
    passport.authenticate('local-login'), 
    function(req, res) {
        hresp.CustomMessage(res, req.user);
});

router.get('/profile', isLoggedIn, function(req, res) {
    var user = new User();
    employee = req.user;
    employee.password = undefined;
    hresp.SuccessFind(res, req.user)
});

router.post('/logout', isLoggedIn, function(req, res) {
        req.logout();
        hresp.CustomMessage(res, "logged out successfull");
    });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    else
        hresp.Unauthorized(res);
    // if they aren't redirect them to the home page
}

module.exports = router;
