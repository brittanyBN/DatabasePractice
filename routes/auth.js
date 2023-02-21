var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);

passport.use(new LocalStrategy(function verify(username, password, cb) {
    userService.getOneByName(username).then((data) => {
        if(data === null) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
            return cb(null, data);
        });
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.Username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

var router = express.Router();
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', function(req, res, next) {
    (req.body.password, 310000, 32, 'sha256', function(err, password) {
        if (err) { return next(err); }
        userService.create(req.body.fullName, req.body.username, password )
        res.redirect('/login');
    });
});

module.exports = router;