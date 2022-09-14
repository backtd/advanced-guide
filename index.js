require('dotenv').config()
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require("passport")
const passportSetup = require('./passport')
const auth = require('./routes/auth')
const dash = require('./routes/dashboard')
const admin = require('./routes/admin')
const path = require('path')

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('MongoDB connected'))

app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/views')))

app.use(auth)
app.use(dash)
app.use(admin)

app.get('*', (req, res) => {
    res.redirect('/auth/login')
})

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))