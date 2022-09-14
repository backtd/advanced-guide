const express = require("express")
const router = express.Router()
const { getLicensesByDiscordId, resetLicense } = require('../functions/whop')


const checkLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

router.get('/dashboard', checkLoggedIn, async (req, res) => {
    var licenses = await getLicensesByDiscordId(req.user.discord_id)

    res.render('index', {
        licenses,
        user: req.user
    })
})

router.post('/resetLicense', checkLoggedIn, express.json(), async (req, res) => {
    var reset = await resetLicense(req.body.license)

    res.json({ message: reset ? 'Reset Success' : 'Reset Failed' })
})

module.exports = router