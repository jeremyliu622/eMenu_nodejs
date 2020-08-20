const Food = require('../Models/Food');

class FoodRepo {
    FoodRepo() {
    }

    async allFood() {
        let allFood = await Food.find().exec();
        return allFood;
    }

    async create(foodObj) {
        try {
            var error = await foodObj.validateSync();

            if (error) {
                let response = {
                    obj: foodObj,
                    errorMessage: error.message
                };
                return response;
            }
            const result = await foodObj.save();
            let response = {
                obj: result,
                errorMessage: ''
            };
            return response;
        }
        catch (err) {
            let response = {
                obj: foodObj,
                errorMessage: err.message
            };
            return response;
        }
    }

    async delete(foodID) {
        let deletedFood = await Food.deleteOne({ _id: foodID }).exec();
        return deletedFood;
    }

    async update(foodID, updating) {
        let updatedFood = await Food.updateOne({_id: foodID}, updating).exec();
        return updatedFood;
    }

    async getFoodByID(foodID) {
        try{
            let selectedFood = await Food.findOne({ _id: foodID }).exec();
            return {
                selectedFood: selectedFood,
                errorMessage: ""
            };
        }
        catch (err) {
            return {
                selectedFood: "",
                errorMessage: err.message
            };
        }
    }

}

module.exports = FoodRepo;