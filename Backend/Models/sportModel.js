const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sportSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    sessions:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Sport', sportSchema)
