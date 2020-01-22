let express = require('express');
let router = express.Router();
let csrf = require('csurf');
let passport = require('passport');
let Product = require('../models/product');

let csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
    Product.find(function (err, docs) {
        let productChunks = [];
        let chuckSize = 3;
        for (let i = 0; i < docs.length; i += chuckSize) {
            productChunks.push(docs.slice(i, i + chuckSize))
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
    });
});

router.get('/user/signup', function (req, res, next) {
    let messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', function (req, res, next) {
    res.render('user/profile')
});

router.get('/user/signin', function (req, res, next) {
    let messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));

module.exports = router;

