const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://pushkardps8:*%40@cluster0.fid6d.mongodb.net/payswift")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        minLength: 6
    },
    firstName: {
        type: String,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model("User", userSchema)

module.exports = {User}

