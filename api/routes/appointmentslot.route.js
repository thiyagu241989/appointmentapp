// permission.route.js

const express = require('express');
const app = express();
const appointmentslotRoutes = express.Router();


// Require permission model in our routes module
let Appointmentslot = require('../models/Appointmentslot');

// Defined store route
appointmentslotRoutes.route('/add').post(function(req, res) {
    let permission = new Appointmentslot(req.body);
    permission.save()
        .then(permission => {
            res.status(200).json({ permission: 'Appointmentslot has been added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
appointmentslotRoutes.route('/').get(function(req, res) {
    Appointmentslot.find(function(err, permissions) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(permissions);
        }
    });
});


module.exports = appointmentslotRoutes;