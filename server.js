var express = require("express");
var session = require("express-session");
var passport = require("passport");
var MediaWikiStrategy = require("passport-mediawiki-oauth").OAuthStrategy;
var config = require("./config");
var cors = require('cors');
var userRouter = require('./routes/user')
var contributionRouter = require('./routes/contribution')

var app = express();
var router = express.Router();

app.use(cors())
app.use(express.json());
app.set("views", __dirname + "/public/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/views"));
app.use('/users', userRouter);
app.use('/contribution', contributionRouter);

app.use(session({ secret: "OAuth Session",
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/", router);

passport.use(
    new MediaWikiStrategy({
        consumerKey: config.consumer_key,
        consumerSecret: config.consumer_secret
    },
        function (token, tokenSecret, profile, done) {
            profile.oauth = {
                consumer_key: config.consumer_key,
                consumer_secret: config.consumer_secret,
                token: token,
                token_secret: tokenSecret
            };
            return done(null, profile);
        }
    ));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

router.get("/", function (req, res) {
    console.log('session', req.session)
    res.send(`welcome home ${req.session}` )
});

router.get("/login", function (req, res) {
    res.redirect(req.baseUrl + "/auth/mediawiki/callback");
});

router.get("/auth/mediawiki/callback", function (req, res, next) {
    console.log('authenticating now ')
    passport.authenticate("mediawiki", function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect(req.baseUrl + "/login");
        }
        console.log('login you in now')
        req.logIn(user, function (err) {
            if (err) {
                console.log('login failed')
                return next(err);
            }
            req.session.user = user;
            res.redirect(req.baseUrl + "/");
        });
    })(req, res, next);
});

router.get("/logout", function (req, res) {
    delete req.session.user;
    res.redirect(req.baseUrl + "/");
});


app.listen(process.env.PORT || 8000, function () {
    console.log("Node.js app listening on port 8000!");
});