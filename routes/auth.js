var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/')
  .get(passport.authenticate('google'))


router.route('/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/error/'}),
    function(req, res) {
      // Successful authentication, redirect to users page
      res.redirect('/users/',
      {
        scope: ['https://www.googleapis.com/auth/contacts.readonly',
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read'
              ]});
  });

  module.exports = router;
