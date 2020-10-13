var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
},
    {
        versionKey: false
    },
    {
        collection: 'foodItems'
    },
);
var Food = mongoose.model('food', foodSchema, 'foodItems');
module.exports = Food;


