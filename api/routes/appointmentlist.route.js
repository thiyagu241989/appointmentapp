// permission.route.js

const express = require('express');
const { listIndexes } = require('../models/Appointmentlist');
const app = express();
const appointmentlistRoutes = express.Router();


// Require permission model in our routes module
let Appointmentlist = require('../models/Appointmentlist');

// Defined store route
appointmentlistRoutes.route('/add').post(async function(req, res) {
    let check = await Appointmentlist.findOne({ appointmentDate: req.body.appointmentDate, startTime: req.body.startTime }).lean()
    console.log(check)
    if (!check) {
        let permission = new Appointmentlist(req.body);
        permission.save()
            .then(permission => {
                res.status(200).json({ message: 'Appointmentlist has been added successfully' });
            })
            .catch(err => {
                res.status(500).json({ message: 'unable to save to database' });
            });
    } else {
        res.status(422).send({
            status: 'fail',
            message: 'Slot not available'
        })
    }



});

// Defined get data(index or listing) route
appointmentlistRoutes.route('/').get(function(req, res) {
    Appointmentlist.find(function(err, permissions) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(permissions);
        }
    });
});

appointmentlistRoutes.route('/view').get(function(req, res) {
    let date = req.query.date;
    let query = {}
    if (date) {
        query = {
            appointmentDate: date
        }
    }
    Appointmentlist.find(query, function(err, list) {
        return res.send({ data: list, count: list.length })
            //return res.status(200).json(user);
    });
});

module.exports = appointmentlistRoutes;