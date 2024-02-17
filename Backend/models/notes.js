const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
}, { timestamps: true });

const Notes = mongoose.model('notes', notesSchema);
module.exports = Notes;