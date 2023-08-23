const mongoose = require('mongoose');
const figureSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    brand: String,
    quantity:Number,
    category:String,
    description: String,
    color:String,
});

const figureModel = mongoose.model('figure', figureSchema, 'figure');
module.exports = figureModel;
