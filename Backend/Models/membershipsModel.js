const mongoose = require('mongoose')

const Schema = mongoose.Schema

const membershipSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    persons:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Membership', membershipSchema)

