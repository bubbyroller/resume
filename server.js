if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

// Import the express features
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Import the routers
const indexRouter = require('./routes/index')

// Assign the structure definitions
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Set up the DB connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => {
    console.log('Connected to MongoDB')
})

// Assing the routes
app.use('/', indexRouter)

// Establish the listening port for the server
app.listen(process.env.PORT)