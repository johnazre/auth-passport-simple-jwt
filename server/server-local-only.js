var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var port = process.env.PORT || 8000
var cors = require('cors')
var logger = require('morgan')
var knex = require('./db/knex')
var session = require('express-session')
var passport = require('passport')

// Express router instance
var app = express()

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Which endpoint to tie the routes within the routes files to.
app.use('/', require('./routes/indexRoutes'))

// Uncomment 'authRoutes-boilerplate' for the boilerplate
// app.use('/auth', require('./routes/authRoutes-boilerplate'))

// Uncomment 'authRoutes-local-only' for Passport Local only
app.use('/auth', require('./routes/authRoutes-local-only'))

// Uncomment 'authRoutes-local-jwt' for Passport JWT
// app.use('/auth', require('./routes/authRoutes-local-jwt'))


app.listen(port, function() {
console.log("listening on port: ", port)
})
