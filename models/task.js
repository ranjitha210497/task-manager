const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    progress: {
        type: Number,
        default: 0,
    },
    notes: [
        {
            _id: {
                type: Number,
                required: true
            },
            note: {
                type: String,
                required: true
            }
        }
    ],
    totalNotesAdded: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);