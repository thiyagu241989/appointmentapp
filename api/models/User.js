// User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define collection and schema for User
let User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
	address: {
        type: String,
        default: null
    },
	city: {
        type: String,
        default: null
    },
	mobile: {
        type: Number,
        default: null
    },
	avatar: {
        type: String,
        default:'assets/img/default_avatar.png'
    },
	oauthToken: {
        type: String,
        default: null
    },
    oauthProviderId: {
        type: String,
        default: null
    },
	oauthProvider: {
        type: String,
        default: 'MY_ACCOUNT'
    },  
	active: {
		type: Boolean,
		default: true
    },
    remember_token: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
    // password: {
    //     type: String,
    //     required: true
    // },
    // hash: String,
    // salt: String,
}, {
    collection: 'user'
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });
//======================================================================================================================
User.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
//======================================================================================================================
module.exports = mongoose.model('User', User);