const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: String,
    email: String,
    discord_id: String,
    image_url: String,
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = User = model('users', UserSchema)