const express = require("express")
const router = express.Router()
const Whop = require('../functions/whop')

const checkLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

const checkisAdmin = (req, res, next) => {
    if(req.user.admin) {
        next()
    } else {
        res.redirect('/dashboard')
    }
}

router.get('/licenses', checkLoggedIn, checkisAdmin, async (req, res) => {
    var licenses = await Whop.getLicenses()

    res.render('licenses', {
        licenses,
        user: req.user
    })
})

router.get('/plans', checkLoggedIn, checkisAdmin, async (req, res) => {
    var plans = await Whop.getPlans()

    res.render('plans', {
        plans,
        user: req.user
    })
})

router.get('/passes', checkLoggedIn, checkisAdmin, async (req, res) => {
    var passes = await Whop.getAccessPasses()

    res.render('passes', {
        passes,
        user: req.user
    })
})

router.get('/purchaseLinks', checkLoggedIn, checkisAdmin, async (req, res) => {
    res.render('purchaseLinks', {
        user: req.user
    })
})

router.post('/api/purchaseLinks', checkLoggedIn, express.json(), async (req, res) => {
    var purchaseLink = await Whop.createPurchaseLink(req.body.plan, req.body.stock, req.body.password)

    res.json({ link: purchaseLink })
})

module.exports = router