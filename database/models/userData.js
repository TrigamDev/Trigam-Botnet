const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    userID: { type: String, required: true },
    userName: { type: String, required: true },

    place: {
        notif: { type: Boolean, default: true },
        contributions: { type: Object, default: {} }
    }
});

module.exports = mongo.model('userData', userSchema);