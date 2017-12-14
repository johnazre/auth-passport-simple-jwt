const passport = require('passport')
const knex = require('../db/knex')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
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

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_STRING
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  console.log('payload', payload);
  // See if user id in the payload exists in our database
  // If it does, call done with that user
  // otherwise, call done without a user object
  knex('patients').select().where('id', payload.sub)
    .then(patient => {
      if(patient.length > 0) {
        done(null, patient)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err, false))
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
