var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
    Product.find(function (err, docs) {
      var productChunks = [];
      var chuckSize = 3;
      for (var i = 0; i < docs.length; i += chuckSize) {
        productChunks.push(docs.slice(i, i + chuckSize))
      }
      res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
    });
});

module.exports = router;
