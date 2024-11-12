const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Ensure AutoIncrement is properly imported

const Schema = mongoose.Schema;

const myUserSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    password: {
       type: String,
       required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['Single', 'Couple', 'Family', 'Pending'],
        default: 'Pending'
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Pending', 'Hold', 'Requires Payment', 'Banned'],
        default: 'Pending'
    },
    membershipNumber: {
        type: Number,
        required: true,
        unique: true
    }
}, { timestamps: true });

myUserSchema.plugin(AutoIncrement, { inc_field: 'id' }); 

myUserSchema.pre('save', async function (next) {
    const user = this;

    // Only hash password if it's new or changed
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('myUser', myUserSchema);
