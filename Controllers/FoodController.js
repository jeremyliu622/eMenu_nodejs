const FoodRepo = require('../Data/FoodRepo');
const _foodRepo = new FoodRepo();
const Food = require('../Models/Food');


exports.FoodMenu = async function(request, response) {
    let allFood = await _foodRepo.allFood();
    if(allFood != null) {
        response.json({ allFood: allFood })
    }
    else {
        response.json({ allFood: [] })
    }
};

exports.CreateFood = async function(request, response) {
    let tempFoodObj = new Food({
        "foodName": request.body.foodName,
        "group": request.body.group,
        "description": request.body.description,
        "price": request.body.price,
    });
    let responseObj = await _foodRepo.create(tempFoodObj);

    if(responseObj.errorMessage == '') {
        response.json({ food: responseObj.obj,
                        errorMessage: ''});
    }
    else {
        response.json({ food: responseObj.obj,
                        errorMessage: responseObj.errorMessage});
    }
};

exports.Delete = async function(request, response) {
    let foodID = request.params.foodID;
    let deletedFood = await _foodRepo.delete(foodID);
    response.json({ errorMessage: "" });

};

exports.Update = async function(request, response) {
    let foodID = request.params.foodID;

    let updating = {
        foodName: request.body.foodName,
        group: request.body.group,
        description: request.body.description,
        price: request.body.price
    };

    let updatedFood = await _foodRepo.update(foodID, updating);
    response.json({ errorMessage: "" });
};

exports.GetFoodByID = async function(request, response) {
    let foodID = request.params.foodID;
    let res = await _foodRepo.getFoodByID({ _id: foodID});
    response.json({
        selectedFood: res.selectedFood,
        errorMessage: res.errorMessage
    })
}