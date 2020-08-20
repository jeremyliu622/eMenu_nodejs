var FoodController = require('./Controllers/FoodController');
const cors = require('cors');

// Routes
module.exports = function(app){  
    app.get('/menu', cors(), FoodController.FoodMenu);
    app.post('/admin/createFood', cors(), FoodController.CreateFood);
    app.delete('/admin/deleteFood/:foodID', cors(), FoodController.Delete);
    app.post('/admin/updateFood/:foodID', cors(), FoodController.Update);
    app.get('/admin/selectedFood/:foodID', cors(), FoodController.GetFoodByID);
};

