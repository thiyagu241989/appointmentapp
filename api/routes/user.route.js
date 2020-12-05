// user.route.js

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const userRoutes = express.Router();

// Require user model in our routes module
let User = require('../models/User');




// Defined store route
userRoutes.route('/add').post(function (req, res) {
	
	// Checks if username(mail) is unique
    User.register(new User({
        name	: req.body.name,
        email	: req.body.email,
		address : req.body.address,
		city	: req.body.city,
		mobile	: req.body.mobile,
		active	: req.body.active
    }), req.body.password, function(err, user) {
		
        if (err) {         
           // console.log('Already Registered: '+err.message);
            return res.status(200).json({
                status: 'error',
                message: err.message
            })
        }
		
		//[OAuth-Authentication Passport]-------------------------------
			// log the user in after it is created
		   passport.authenticate('local')(req, res, function(){
			   console.log('authenticated by passport');
			   return res.status(200).json({
				   status: 'success',
				   message: 'Users added successful!'
			   })
		   });
			 //--------------------------------------------------------   
    }); 

});
 
// Defined get data(index or listing) route
userRoutes.route('/').get(authenticateToken, function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
}); 

// Defined edit route
userRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        return res.status(200).json(user);
    });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("Record not found");
        else {
            user.name    = req.body.name;
            user.email   = req.body.email;
			user.address = req.body.address;
			user.city 	 = req.body.city;
			user.mobile  = req.body.mobile;
			user.active  = req.body.active;
            user.save().then(user => {
                res.json('Update complete');
			}).catch(err => {
                res.status(400).send("unable to update the database");
			});
        }
    });
});
 
// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
	console.log('iddd'+req.params.id);
    User.findByIdAndRemove({_id: req.params.id}, function (err, user) {
        if (err) res.json(err);
        else return res.status(200).json('Successfully removed');
    });
});

function authenticateToken(req, res, next) {
	console.log('request header:'+req.headers['authorization']);
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  console.log('header api:'+authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  const SECRET = 'MY_SECRET';
 if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

module.exports = userRoutes;