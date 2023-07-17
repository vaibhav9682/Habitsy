const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    about: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,

    },
    track: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day'
        }
    ]

}, {
    timestamps: true
})


const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;