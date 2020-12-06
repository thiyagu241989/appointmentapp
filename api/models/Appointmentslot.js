// Appointmentslot.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Appointmentslot
let Appointmentslot = new Schema({
    appointmentDate: {
        type: String
    },
    slotType: {
        type: String
    },
    slotEvent: {
        type: String
    },
    slotInterval: {
        type: String
    },
    slot: {
        type: Array,
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
    collection: 'appointmentslot'
});

module.exports = mongoose.model('Appointmentslot', Appointmentslot);