const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
require('../config/auth-local-only')

/*
  Authentication with only Passport Local Strategy and bcrypt
*/

const requireSignin = passport.authenticate('local', { session: false })

router.post('/signup', function(req, res) {
  let { email, password, name } = req.body;

  if(!email || !password || !name) {
    return res.status(422).send({error: 'You must provide an email and password'})
  }

  knex('users').select().where('email', email)
    .then(user => {
      if(user.length > 0){
        res.status(422).send({ error: 'Email is in use'})
      } else {
        const hash = bcrypt.hashSync(password);
        knex('users').insert({ name, email, password: hash }).returning('*')
          .then(user => res.json({user: req.user, message: 'you have successfully created a signup'}))
      }
    })
});

router.post('/signin', requireSignin, function(req, res) {
  console.log('req.user', req.user)
  let { id, name, email } = req.user;
  res.send({ message: 'successful sign in', user: {id, name, email}, authenticated:true })
});

module.exports = router
