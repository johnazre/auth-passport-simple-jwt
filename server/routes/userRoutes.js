var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET all users. */
router.get('/users', function(req, res, next) {
  knex('users')
    .select()
    .then(users => res.json(users))
});

/* GET all users. */
router.get('/users/:id', function(req, res, next) {
  knex('users')
    .select()
    .where('id', req.params.id)
    .then(user => res.json(user[0]))
});

/* PATCH one user. */
router.patch('/users/:id', function(req, res, next) {
  let { name, email } = req.body
  knex('users')
    .update({ name, email })
    .where('id', req.params.id)
    .returning('*')
    .then(updatedUser => res.json(updatedUser));
});

/* DELETE one user. */
router.delete('/users/:id', function(req, res, next) {
  let { name, email } = req.body
  knex('users')
    .update({ name, email })
    .where('id', req.params.id)
    .returning('*')
    .then(removedUser => res.json(removedUser));
});

module.exports = router;
