// user.route.js

const express = require('express');
const app = express();
const authRoutes = express.Router();
const passport = require('passport');

// Require user model in our routes module
let User = require('../models/User');
		
// Defined store route: 
// passport-local-mongoose: Convenience method to register a new user instance with a given password.                  
authRoutes.route('/register').post(function (req, res) {
	
	//Token Generated for sendMail verification:
	let user = new User(req.body);	
	//var verifyToken = user.generateJwt();

    // Checks if username(mail) is unique
    User.register(new User({
        name  : req.body.name,
        email : req.body.email
    }), req.body.password, function(err, user) {
		
        if (err) {         
           // console.log('Already Registered: '+err.message);
            return res.status(200).json({
                status: 'error',
                message: err.message
            })
        }
				
		//[OAuth-Authentication Passport]-----------------------------
			// log the user in after it is created
		   passport.authenticate('local')(req, res, function(){
			   console.log('authenticated by passport');
			   return res.status(200).json({
				   status: 'success',
				   message: 'Registration successful!'
			   })
		   });
		 //--------------------------------------------------------   
    }); 

});


// Login Router:
authRoutes.route('/login').post(function (req, res) {
	
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(200).json({
                status: 'error',
                message: info.message
            })
        }
        if (!user) {        
            return res.status(200).json({
                status: 'error',
                message: info.message
            })
        }
		 if (!user.active) {         
            return res.status(200).json({
                status: 'error',
                message: 'Inactive Accounts'
            })
        }

        // If credentials are correct, return the user object----------------------------------
        req.logIn(user, function(err) {
          
            if (err) {
                // console.log("Could not log in user");
                return res.status(200).json({
                    status: 'error',
                    message: info.message
                })
            }
            //Generate Token & Logged User
            var authToken = user.generateJwt();
            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                authToken: authToken,
                data: user
            })
        });
        //------------------------------------------------------------------------------------
    })(req, res, next);

});


// Defined get data(logout) route
authRoutes.route('/logout').get(function (req, res) {
    req.logout();
    return res.status(200).json({
        status: 'success',
        message: 'Logout successful'
    })
});


function next() {
    console.log(arguments);
}

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.email === 'admin@example.com'){
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        //res.redirect('/admin');
    }
}

module.exports = authRoutes;