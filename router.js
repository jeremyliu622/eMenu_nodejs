var FoodController = require('./Controllers/FoodController');
var OrderController = require('./Controllers/OrderController');
const cors = require('cors');
const Food = require('./Models/Food');

// Routes
module.exports = function(app){  
    app.get('/menu', cors(), FoodController.FoodMenu);
    app.post('/admin/createFood', cors(), FoodController.CreateFood);
    app.delete('/admin/deleteFood/:foodID', cors(), FoodController.Delete);
    app.get('/admin/selectedFood/:foodID', cors(), FoodController.GetFoodByID);
    app.post('/admin/updateFood/:foodID', cors(), FoodController.Update);
    app.post('/submitOrder/:tableNum', cors(), OrderController.CreateOrder);
    app.get('/allOrders', cors(), OrderController.Index);
    app.get('/order/:tableNum', cors(), OrderController.getOrderByTable);



};

