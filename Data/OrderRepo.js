const Order = require('../Models/Order');

class OrderRepo {
    OrderRepo() {
    }

    async allOrders() {
        let allOrders = await Order.find().exec();
        return allOrders;
    }

    async create(orderObj) {
        try {
            var error = await orderObj.validateSync();

            if(error) {
                let response = { obj: orderObj,
                                 errorMessage: error.message};
                return response;
            }
            const result = await orderObj.save();
            let response = { obj: result,
                             errorMessage: ''};
            return response;
        }
        catch(err) {
            let response = { obj: orderObj,
                             errorMessage: err.message};
            return response;
        }
    }

    async getOrdersByFilter(tableNum, orderDate, isCompleted) {
        let selectedOrders;
        try{
            if(tableNum){
                selectedOrders = await Order.find({ tableNum: tableNum, 
                    orderDate: orderDate,
                    isCompleted: isCompleted }).exec();
            }
            else{
                selectedOrders = await Order.find({ 
                    orderDate: orderDate,
                    isCompleted: isCompleted }).exec();
            }

            return {
                selectedOrders: selectedOrders,
                errorMessage: ""
            };
        }
        catch (err) {
            return {
                selectedOrders: "",
                errorMessage: err.message
            };
        }
    }

    async getOrderByTableNum(tableNum) {
        try{
            let unCompletedOrders = await Order.find({ tableNum: tableNum, isCompleted: false }).exec();
            return {
                unCompletedOrders: unCompletedOrders,
                errorMessage: ""
            };
        }
        catch (err) {
            return {
                unCompletedOrders: "",
                errorMessage: err.message
            };
        }
    }

    async update(filter, updating) {
        let updatedOrder = await Order.update(filter, updating).exec();
        return updatedOrder;
    }

}

module.exports = OrderRepo;