var express = require( "express" );
var passport = require( "passport" );
var MediaWikiStrategy = require( "passport-mediawiki-oauth" ).OAuthStrategy;
var config = require( "./config" );


var router = express.Router();
var app = express();
app.use( express.static(__dirname + "/public/views") );

app.use(require('express-session')({
  secret: 'OAuth Session',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new MediaWikiStrategy({
		consumerKey: config.consumer_key,
		consumerSecret: config.consumer_secret
	},
	function ( token, tokenSecret, profile, done ) {
		profile.oauth = {
			consumer_key: config.consumer_key,
			consumer_secret: config.consumer_secret,
			token: token,
			token_secret: tokenSecret
		};
		return done( null, profile );
	}
	) );

passport.serializeUser(	function ( user, done ) {
	done( null, user );
});

passport.deserializeUser( function ( obj, done ) {
	done( null, obj );
});

app.use( "/", router );

app.set( "views", __dirname + "/public/views" );
app.set( "view engine", "ejs" )

router.get( "/", function ( req, res ) {
	console.log(passport.session.user)
	res.send({
		user: passport.session.user,
		url: req.baseUrl
	} );
} );

router.get( "/login", function ( req, res ) {
	res.redirect( req.baseUrl + "/auth/mediawiki/callback" );
} );
 
router.get( "/auth/mediawiki/callback", function( req, res, next ) {
	passport.authenticate( "mediawiki", function( err, user ) {
		if ( err ) {
			return next( err );
		}

		if ( !user ) {
			return res.redirect( req.baseUrl + "/login" );
		}

		req.logIn( user, function( err ) {
			if ( err ) {
				return next( err );
			}
			res.redirect( req.baseUrl + "/" );
		} );
	} )( req, res, next );
} );

router.get( "/logout" , function ( req, res ) {
	delete req.session.user;
	res.redirect( req.baseUrl + "/" );
} );

app.listen( process.env.PORT || 5000, function () {
	console.log( "Node.js app listening on port 5000!" );
} );
