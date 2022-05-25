const mongoose = require('mongoose')

const UserSchema = {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('users', UserSchema)