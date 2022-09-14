const fetch = require('node-fetch')

const getLicensesByDiscordId = (discord_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(`https://api.whop.com/api/v1/licenses?discord_account_id=${discord_id}`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.WHOP_TOKEN
            }
        })

        const body = await response.json()

        var arr = []

        var arr = body.users

        resolve(arr)
    } catch (error) {
        console.log(error)
        resolve([])
    }
})

const getLicenses = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(`https://api.whop.com/api/v1/licenses`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.WHOP_TOKEN
            }
        })

        const body = await response.json()

        var arr = body.users

        resolve(arr)
    } catch (error) {
        console.log(error)
        resolve([])
    }
})

const resetLicense = (license) => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(`https://api.whop.com/api/v1//licenses/${license}/reset`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + process.env.WHOP_TOKEN
            },
            json: {
                metadata: {}
            }
        })

        const body = await response.json()

        if(body.success) {
            resolve(true)
        } else {
            resolve(false)
        }
    } catch (error) {
        console.log(error)
        resolve([])
    }
})

const getPlans = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('https://api.whop.com/api/v1/plans', {
            headers: {
                'Authorization': 'Bearer ' + process.env.WHOP_TOKEN
            }
        })

        const body = await response.json()

        var arr = body.plans

        resolve(arr)
    } catch (error) {
        console.log(error)
        resolve([])
    }
})

const getAccessPasses = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('https://api.whop.com/api/v1/access_passes', {
            headers: {
                'Authorization': 'Bearer ' + process.env.WHOP_TOKEN
            }
        })

        const body = await response.json()

        var arr = body.access_passes

        resolve(arr)
    } catch (error) {
        console.log(error)
        resolve([])
    }
})

const createPurchaseLink = (plan, stock, password) => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(`https://api.whop.com/api/v1/plans/${plan}/create_link?stock=${stock}${password.length > 0 ? `&password=${password}` : ''}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + process.env.WHOP_TOKEN
            }
        })

        const body = await response.json()

        if(body.success) {
            resolve(body.release_link.direct_link)
        } else {
            resolve(body.message)
        }
    } catch (error) {
        console.log(error)
        resolve('Invalid Request Body')
    }
})

module.exports = {
    getLicensesByDiscordId,
    getLicenses,
    resetLicense,
    getPlans,
    getAccessPasses,
    createPurchaseLink
}