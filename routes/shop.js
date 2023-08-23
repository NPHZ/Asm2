var express = require('express');
const plushModel = require('../model/plushModel');
const figureModel = require('../model/figureModel');
var router = express.Router();

router.get('/', async (req, res) => {
    var figures = await figureModel.find();
    var plushs = await plushModel.find();
    res.render('shop/index', { figure: figures, plush: plushs });
});

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var figures = await figureModel.findById(id);
    var plushs = await plushModel.findById(id);
    if(figures){
        res.render('shop/detail', { toys: figures });
    } else if(plushs){
        res.render('shop/detail', { toys: plushs})
    }
    
});

router.post('/order', async (req, res) => {
    var data = req.body;
    var id = data.id;
    var toys = await figureModel.findById(id) || await plushModel.findById(id);
    var price = data.price;
    var quantity = data.quantity;
    var total = price * quantity;
    var text = "You have ordered a product with id " + id + " and quantity is " + quantity;
    console.log(text);
    if(toys){
        toys.quantity -=quantity //toys.quantity = toys.quantity - quantity
        await toys.save()
    }
    res.render('shop/order', { toys: toys, quantity: quantity, price: price, total: total });

 })


router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var figures = await figureModel.find({ name: new RegExp(keyword, "i") });
    var plushs = await plushModel.find({ name: new RegExp(keyword, "i") });
    res.render('shop/index', { figure: figures, plush: plushs });
});



module.exports = router;