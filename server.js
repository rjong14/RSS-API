//Node modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var gfeed = require('google-feed-api');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');

//Own modules
var hresp = require('./functions/response.js');
var feed_function = require('./functions/feed_functions.js');

//Models
var Feed = require('./models/feed.js');
var User = require('./models/user.js');

mongoose.connect('mongodb://admin:admin@ds039960.mongolab.com:39960/rssdb');
app.use(cors());
app.use(cookieParser()); // read cookies (needed for passport)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8080));

var router = express.Router();

// required for passport
require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//routes
var userRoutes = require('./routes/user_routes.js');
var feedRoutes = require('./routes/feed_routes.js');
var authRoutes = require('./routes/authentication_routes.js')

//test every few minutes
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
    //feed_function.emptyFeeds();
    feed_function.updateFeeds();
}, the_interval);

//Middleware
router.use(function(req, res, next){
    console.log('Something is happening');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//TODO require other routes here from the routes folder

//A prefix for the API routes
app.use('/api', router);
app.use(userRoutes);
app.use(feedRoutes);
app.use(authRoutes);

app.listen(app.get('port'), function(){
    console.log('Magic happens on port ' + app.get('port'));
});
