var express = require('express')
var router = express.Router()

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/order');
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateStock} = require ('../controllers/product');


//params
router.param('userId', getUserById);
router.param('ordertId', getOrderById)


//Actual routes
// create
router.post('/order/create/:userId', isSignIn, isAuthenticated,pushOrderInPurchaseList, updateStock, createOrder);

// read
router.get('/order/all/:userId',isSignIn, isAuthenticated, isAdmin, getAllOrders);

//status of order
router.get('/order/status/:userId', isSignIn, isAuthenticated, isAdmin, getOrderStatus);
router.put('/order/:orderId/status/:userId', isSignIn, isAuthenticated, isAdmin, updateStatus);



module.exports = router;