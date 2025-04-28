const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('PageView', pageViewSchema);