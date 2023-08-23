var express = require('express');
const figureModel = require('../model/figureModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var figures = await figureModel.find();
   res.render('figure/index', { figure: figures });
});

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var figures = await figureModel.findById(id);
   res.render('figure/detail', { figure: figures });
});

router.get('/delete/:id', async (req, res) => {
   await figureModel.findByIdAndDelete(req.params.id);
   res.redirect('/figure');
});

router.get('/add', (req, res) => {
   res.render('figure/add');
});

router.post('/add', async (req, res) => {
   var figure = req.body;
   await figureModel.create(figure)
      .then(console.log('Add successfully !'))
      .catch(err => console.log(err));
   res.redirect('/figure');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var figures = await figureModel.findById(id);
   res.render('figure/edit', { figure: figures });
});

router.post('/edit/:id', async (req, res) => {
   await figureModel.findByIdAndUpdate(req.params.id, req.body)
      .then(console.log('Edit successfully !'))
      .catch(err => console.log(err));
   res.redirect('/figure');
});

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var figures = await figureModel.find({ name: new RegExp(keyword, "i") })
   res.render('figure/index', { figure: figures });
});


router.get('/sort/price/asc', async (req, res) => {
   var figures = await figureModel.find().sort({ price: -1 });
   res.render('figure', { figure: figures });
}); router.get('/sort/price/desc', async (req, res) => {
   var figures = await figureModel.find().sort({ price: 1 });
   res.render('figure', { figure: figures });
});

router.post('/order', async (req, res) => {
   var data = req.body;
   var id = data.id;
   var figure = await figureModel.findById(id);
   var price = data.price;
   var quantity = data.quantity;
   var total = price * quantity;
   var text = "You have ordered a product with id " + id + " and quantity is " + quantity;
   console.log(text);
   res.render('figure/order', { figure: figure, quantity: quantity, price: price, total: total });
})

module.exports = router;