let express = require('express');
let router = express.Router();
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

module.exports = router;

