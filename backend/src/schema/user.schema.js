const Schema = require('mongoose').Schema;

module.exports = new Schema({
    username: { 
        type: String, 
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { collection : 'usertables' });