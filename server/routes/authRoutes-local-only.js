var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/*
  Authentication with only Passport Local Strategy and bcrypt
*/

router.post('/signup', function(req, res) {
  let email = req.body.email
  let password = req.body.password

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide an email and password'})
  }

  knex('users').select().where('email', email)
    .then(user => {
      if(user.length > 0){
        res.status(422).send({ error: 'Email is in use'})
      } else {
        var hash = bcrypt.hashSync(password);
        knex('users').insert({ email, password: hash }).returning('*')
          .then(user => res.json({user: req.user, message: 'you have successfully created a signup'}))
      }
    })
});

router.post('/signin', requireSignin, function(req, res) {
  res.send({ token: tokenForUser(req.user)})
});
