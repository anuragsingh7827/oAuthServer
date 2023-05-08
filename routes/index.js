const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateJWT } = require('../middlewares/generateJWT');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

const clientUrl = process.env.CLIENT_URL_DEV;

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    console.log(req.user);
    const token = generateJWT(req.user);
    console.log(token);
    res.cookie('x-auth-cookie', token);
    res.redirect(clientUrl);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully.' });
});

module.exports = router;
