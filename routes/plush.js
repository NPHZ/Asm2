var express = require('express');
const plushModel = require('../model/plushModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var plushs = await plushModel.find();
   res.render('plush/index', { plush: plushs });
});

router.get('/delete/:id', async (req, res) => {
   await plushModel.findByIdAndDelete(req.params.id);
   res.redirect('/plush');
});

router.get('/add', (req, res) => {
   res.render('plush/add');
});

router.post('/add', async (req, res) => {
   var plush = req.body;
   await plushModel.create(plush)
      .then(console.log('Add successfully !'))
      .catch(err => console.log(err));
   res.redirect('/plush');
});


router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var plushs = await plushModel.findById(id);
   res.render('plush/edit', { plush: plushs });
});

router.post('/edit/:id', async (req, res) => {
   await plushModel.findByIdAndUpdate(req.params.id, req.body)
      .then(console.log('Edit successfully !'))
      .catch(err => console.log(err));
   res.redirect('/plush');
});

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var plushs = await plushModel.find({ name: new RegExp(keyword, "i") })
   res.render('figure/index', { plush: plushs });
});

router.get('/sort/price/asc', async (req, res) => {
   var plushs = await plushModel.find().sort({ price: -1 });
   res.render('plush', { plush: plushs });
}); router.get('/sort/price/desc', async (req, res) => {
   var plushs = await plushModel.find().sort({ price: 1 });
   res.render('plush', { plush: plushs });
});

module.exports = router;