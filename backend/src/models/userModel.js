const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isLoggedIn: {type: Schema.Types.Mixed, default: false},
    access_token: {type: String, required: false}

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('UserAccount', schema, 'userAccounts');