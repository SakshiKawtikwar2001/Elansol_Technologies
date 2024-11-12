const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dateCreated: {
        type: Date,
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'suspended'],
        trim: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Data', DataSchema);
