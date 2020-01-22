let express = require('express');
let router = express.Router();
let Cart = require('../models/cart');
let Product = require('../models/product');

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

router.get('/add-to-cart/:id', function (req, res, next) {
   let productId = req.params.id;
   let cart = new Cart(req.session.cart ? req.session.cart : {});

   Product.findById(productId, function (err, product) {
       if (err){
           return res.redirect('/')
       }
       cart.add(product, product.id);
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/');
   })
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart){
        return res.render('shop/shopping-cart', {products: null})
    }
    let cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;

