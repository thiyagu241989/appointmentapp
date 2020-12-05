const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
config = require('./DB'); //db import


//passport authentication:--------------------------
passport = require('passport');
expressSession = require('express-session');
localStrategy = require('passport-local').Strategy;

//use mongoose library to set up the database connection with MongoDB. 


const uri = "mongodb+srv://user1:Passwordqwerty@cluster0.tiyoc.mongodb.net/appointementdb?retryWrites=true&w=majority";



mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const User = require('./models/User.js');

//Define Middleware:---------------------------------------
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// passport configuration:---------------------------------
// requires the model with Passport-Local Mongoose plugged in : use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors({
    exposedHeaders: ['Content-Length', 'token'],
}));

//Router define:------------------------------------
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const appointmentslotRoute = require('./routes/appointmentslot.route');
const appointmentlistRoute = require('./routes/appointmentlist.route');

//router call:-------------------------------------
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/appointmentslot', appointmentslotRoute);
app.use('/appointmentlist', appointmentlistRoute);

app.get('/', function(req, res) {
    res.send("welcome page");
});

// catch 500 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.end(JSON.stringify({
        message: "page not found",
        error: {}
    }));
});

const port = process.env.PORT || 4000;
const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});