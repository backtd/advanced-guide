const express = require("express")
const router = express.Router()
const passport = require("passport")

const checkLoggedIn = (req, res, next) => {
    if (req.user) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

router.get('/auth/login', checkLoggedIn, (req, res) => {
    res.render('login')
})

router.get('/auth/discord', passport.authenticate('discord'))

router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/dashboard')
})

router.get('/auth/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        req.session = null
        res.redirect('/auth/login')
    })
})

module.exports = router