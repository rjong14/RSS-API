//Node modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var hresp = require('./resources/response.js');
var gfeed = require('google-feed-api');

//Models
var Feed = require('./models/feed.js');
var User = require('./models/user.js');


mongoose.connect('mongodb://admin:admin@ds039960.mongolab.com:39960/rssdb');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8080));

var router = express.Router();

//routes
var userRoutes = require('./routes/user_routes.js')(router, User, Feed, hresp);

//test code
var tweakfeed = new gfeed.Feed('http://tweakers.mobi/rss/nieuws');
tweakfeed.setNumEntries(10);
tweakfeed.load(function(result) {
  if (!result.error) {
       console.log(result.feed);
    }
  else {
      console.log("error");
  }
});


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

app.listen(app.get('port'), function(){
    console.log('Magic happens on port ' + app.get('port'));
});
