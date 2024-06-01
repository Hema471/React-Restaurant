const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    street: String,
    city: String,
    country: String
});

const UserSchema = new Schema({
    // firstname: {
    //     type: String,
    // },
    // lastname: {
    //     type: String,
    // },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['ADMIN','owner','user'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        // lowercase: true
    },
    // new field for restaurantId with default value as null
    resId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        default: null
    },
    location: {
        type: String,
        default: null
    },
    userImg:{
        type:String,
        required: false,
    },
    // OwnedResId:{
    //     type:String,
    //     required: false,
    // },
    phoneNumber:{
        type:String,
        required: true
    },
    // location: {
    //     type: String,
    //     required: false
    // },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    UpdatedAt: {
        type: Date,
        default: () => Date.now()
    },
    resetCode: {
        type: String,
        required: false
    },
    resetCodeExp: {
        type: Date,
        required: false
    }
});

// const User = mongoose.model("User", UserSchema);
// module.exports = User;

module.exports = mongoose.model("User", UserSchema);