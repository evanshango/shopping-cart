var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'http://cdn3.whatculture.com/images/2019/10/ebb3d7e600c0a008-600x338.jpg',
        title: 'Batman',
        description: 'Striking fear into the hearts of criminals. Of course I am Batman',
        price: 10
    }),
    new Product({
        imagePath: 'https://www.adventuresinpoortaste.com/wp-content/uploads/2020/01/Batman-86-cover.jpg',
        title: 'Batman',
        description: 'Striking fear into the hearts of criminals. Of course I am Batman',
        price: 5
    }),
    new Product({
        imagePath: 'https://vignette.wikia.nocookie.net/youngjustice/images/1/1c/Nightwing_2019.png/revision/latest?cb=20190827191358',
        title: 'Batman',
        description: 'Striking fear into the hearts of criminals. Of course I am Batman',
        price: 20
    }),
    new Product({
        imagePath: 'https://vignette.wikia.nocookie.net/youngjustice/images/d/d1/Batman.png/revision/latest?cb=20190827191357',
        title: 'Batman',
        description: 'Striking fear into the hearts of criminals. Of course I am Batman',
        price: 25
    }),
    new Product({
        imagePath: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/10/BatmanFeature2.jpg',
        title: 'Batman',
        description: 'Striking fear into the hearts of criminals. Of course I am Batman',
        price: 20
    }),
    new Product({
        imagePath: 'https://img1.looper.com/img/gallery/robert-pattinson-wants-to-push-batman-to-his-absolute-limits/intro-1579030564.jpg',
        title: 'Batman',
        description: 'Striking fear into the hearts of criminals. Of course I am Batman',
        price: 35
    }),
];

var done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
