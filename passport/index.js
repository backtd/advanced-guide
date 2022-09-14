const passport = require('passport')
const DiscordStrategy = require('passport-discord')
const { getLicenses } = require('../functions/whop')
const User = require('../modals/users')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, res) => {
        done(err, res)
    })
})

function rNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var scopes = ['identify', 'email', 'guilds', 'guilds.join']

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    scope: scopes
}, async (accessToken, refreshToken, profile, cb) => {
    var user = await User.findOne({ discord_id: profile.id })
    var image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=1024`
    if(!profile.avatar) {
        image_url = `https://cdn.discordapp.com/embed/avatars/${rNum(0, 5)}.png`
    }
    var username = profile.username + '#' + profile.discriminator
    if(user) {
        User.updateOne({ discord_id: profile.id }, { $set: { image_url: image_url, username: username } }, (err, res) => {
            return cb(null, user)
        })
    } else {
        new User({
            username: username,
            email: profile.email,
            discord_id: profile.id,
            image_url: image_url,
        }).save().then(user => {
            return cb(null, user)
        })
    }
}))

module.exports = passport