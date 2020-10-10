const OrderRepo = require('../Data/OrderRepo');
const _orderRepo = new OrderRepo();
const Order = require('../Models/Order');

exports.Index = async function(request, response) {
    let allOrders = await _orderRepo.allOrders();
    if(allOrders != null) {
        response.json({ allOrders: allOrders })
    }
    else {
        response.json({ allOrders:[] })
    }
};

exports.getOrderByTable = async function(request, response) {
    let tableNum = request.params.tableNum;
    let responseObj = await _orderRepo.getOrderByTableNum(tableNum);
    if(responseObj.unCompletedOrders != null) {
        response.json({ unCompletedOrders: responseObj.unCompletedOrders, 
                        errorMessage: ''})
    }
    else {
        response.json({ unCompletedOrders:[],
                        errorMessage: responseObj.errorMessage})
    }

}


exports.CreateOrder = async function(request, response) {
    let _dateTime = new Date();
    let orderDate = _dateTime.getMonth() + 1  + "/" + _dateTime.getDate() + "/" + _dateTime.getFullYear();
    let orderTime = _dateTime.toString();
    let tempOrderObj = new Order({
        'orderDate':    orderDate,
        'orderTime':    orderTime,
        'tableNum':     request.body.tableNum,
        'totalPrice':   request.body.totalPrice,
        'orderItems':   request.body.orderItems,
        'isCompleted':  request.body.isCompleted,
    });
    let responseObj = await _orderRepo.create(tempOrderObj);

    if (responseObj.errorMessage == '') {
        response.json({ order: responseObj.obj,
                        errorMessage: ''});
    }
    else {
        response.json({ order: responseObj.obj,
                        errorMessage: responseObj.errorMessage});
    }
};