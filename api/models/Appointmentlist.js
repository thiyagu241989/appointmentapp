// Appointmentlist.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Appointmentlist
let Appointmentlist = new Schema({
    name: {
        type: String
    },
    appointmentDate: String,
    contact: {
        type: String,
        default: null
    },
    startTime: {
        type: String,
        default: null
    },
    slotEvent: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'appointmentlist'
});

module.exports = mongoose.model('Appointmentlist', Appointmentlist);