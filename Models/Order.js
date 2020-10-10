var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
        orderDate:      {'type' : String, required: true},
        orderTime:      {'type' : String, required: true},
        tableNum:       {'type' : Number, required: true},
        totalPrice:     {'type' : String, required: true},
        orderItems:     {'type' : Array, required: true},
        isCompleted:    {'type' : Boolean, required: true},
    },
    {
        versionKey: false
    },
    {
        collection: 'orders'
    },
);
var Order = mongoose.model('order', orderSchema, 'orders');
module.exports = Order;