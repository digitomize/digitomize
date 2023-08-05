const mongoose = require('mongoose');

const stringToggleSchema = new mongoose.Schema({
    data: String,
    showOnWebsite: Boolean
});

const numberToggleSchema = new mongoose.Schema({
    data: Number,
    showOnWebsite: Boolean
});

const contestToggleSchema = new mongoose.Schema({
    username: String,
    rating: Number,
    badge: String,
    fetchTime: Number,
    showOnWebsite: Boolean
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: [true, "First name is required."]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    bio: {
        type: stringToggleSchema,
        default: { data: "", showOnWebsite: false }
    },
    dateOfBirth: {
        type: stringToggleSchema,
        default: { data: "", showOnWebsite: false }
    },
    phoneNumber: {
        type: numberToggleSchema,
        default: { data: "", showOnWebsite: false }
    },
    github: {
        type: stringToggleSchema,
        default: { data: "", showOnWebsite: false }
    },
    codechef: {
        type: contestToggleSchema,
        default: undefined
    },
    leetcode: {
        type: contestToggleSchema,
        default: undefined
    },
    codeforces: {
        type: contestToggleSchema,
        default: undefined
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
