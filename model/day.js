const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({

    month: {
        type: String,
        require: true,
    },
    date: {
        type: Number,
        require: true,

    },
    status: {
        type: String,
        require: true,

    },
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    },

}, {
    timestamps: true
})


const Day = mongoose.model('Day', daySchema);
module.exports = Day;