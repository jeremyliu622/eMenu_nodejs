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


exports.CreateOrder = async function(request, response) {
    let _dateTime = new Date();
    let _month = _dateTime.getMonth() + 1;;
    let _day = _dateTime.getDate();
    if(_dateTime.getMonth() < 9) {
        _month = '0' + _month;
    }
    if(_dateTime.getDate() < 10) {
        _day = '0' + _day;
    }
    let orderDate = _dateTime.getFullYear() + "-" + _month +"-" + _day;
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

exports.getOrdersByFilter = async function(request, response) {
    let tableNum = request.body.tableNum;
    let orderDate = request.body.orderDate;
    let isCompleted = request.body.isCompleted;
    let responseObj = await _orderRepo.getOrdersByFilter(tableNum, orderDate, isCompleted);
    if(responseObj.selectedOrders != null) {
        response.json({ selectedOrders: responseObj.selectedOrders, 
                        errorMessage: ''})
    }
    else {
        response.json({ selectedOrders:[],
                        errorMessage: responseObj.errorMessage})
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
};

exports.complete = async function(request, response) {
    let filter = {
        _id: request.body._id,
    }

    let updating = {
        isCompleted: true
    };

    let updatedOrder = await _orderRepo.update(filter, updating);
    response.json({ errorMessage: "" });
};

// exports.edit = async function(request, response) {
//     let filter = {
//         _id: request.body._id,
//     }

//     let updating = {
//         orderItems: request.body.orderItems,
//     };

//     let updatedOrder = await _orderRepo.update(filter, updating);
//     response.json({ errorMessage: "" });
// };