const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hrSchema = new Schema({
    added_by: {
        type: Schema.Types.ObjectId,
        ref: 'hrs'
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    hr_no: {
        type: Number,
        required: true
    },
    permission: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = HR = mongoose.model('hrs', hrSchema);