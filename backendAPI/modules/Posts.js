const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    key: {
        type: String,
        require: true
    },
    value: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Posts', PostSchema);