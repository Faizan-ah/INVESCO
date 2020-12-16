const mongoose = require('mongoose');

//schema 
const Schema= mongoose.Schema;
const UserSessionSchema = new Schema({
    userID:{
        type: String,
        default: ''
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    isDeleted:{
        type: Boolean,
        default: false
    },

});

//model
const UserSession = mongoose.model('UserSession',UserSessionSchema);

module.exports = UserSession;