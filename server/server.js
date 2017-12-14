var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var port = process.env.PORT || 8000
var cors = require('cors')
var logger = require('morgan')
var knex = require('./db/knex')

// Express router instance
var app = express()

// These are only related to our views folder and the fact that
// we are using EJS as a template rendering library.
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Which endpoint to tie the routes within the routes files to.
app.use('/', require('./routes/indexRoutes'))

// Uncomment 'authroutes1' for the boilerplate
app.use('/auth', require('./routes/authRoutes-boilerplate'))

// Uncomment 'authroutes2' for Passport Local only
// app.use('/auth', require('./routes/authRoutes-local-only'))

// Uncomment 'authroutes3' for Passport JWT
// app.use('/auth', require('./routes/authRoutes-local-jwt'))


app.listen(port, function() {
console.log("listening on port: ", port)
})
