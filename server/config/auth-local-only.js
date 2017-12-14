const passport = require('passport')
const knex = require('../db/knex')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt-nodejs')

// Create local strategy
const localLogin = new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password, otherwise
  // call done with false
  knex('patients').select().where('email', email)
    .then(result => {
      let patient = result[0];
      if(result.length > 0 && bcrypt.compareSync(password, patient.password)) {
        done(null, result[0])
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err, false))
})
// Tell passport to use this strategy
passport.use(localLogin)
