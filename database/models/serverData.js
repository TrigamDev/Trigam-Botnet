const mongo = require('mongoose');

const serverSchema = new mongo.Schema({
    dataVersion: { type: Number, default: 0 },
    
    serverID: { type: String, required: true },
    serverName: { type: String, required: true },
    
    place: {
        pixelData: { type: String },
        cooldown: { type: Number, default: 3 },
        placedPixels: { type: Number, default: 0 },
        darkMode: { type: Boolean, default: false },

        milestones: {
            color: { type: Number, default: 0 },
            size: { type: Number, default: 0 },
        }
    }
});

module.exports = mongo.model('serverData', serverSchema);