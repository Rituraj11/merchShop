var express = require('express')
var router = express.Router()


const { 
    getProductById, 
    createProduct, 
    getProduct, 
    photo, 
    removeProduct, 
    updateProduct, 
    getAllProducts, 
    getAllUniqueCategories 
} = require('../controllers/product');

const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');


router.param('userId', getUserById);
router.param('productId', getProductById)

// Create route
router.post('/product/create/:userId', isSignIn, isAuthenticated, isAdmin, createProduct);

// Read routes
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo)

//Update routes
router.put('/product/:productId/:userId', isSignIn, isAuthenticated, isAdmin, updateProduct);


//Delete routes
router.delete('/product/:productId/:userId', isSignIn, isAuthenticated, isAdmin, removeProduct);

//Listing routes
router.get('/products', getAllProducts);
router.get('/products/categories', getAllUniqueCategories);

module.exports = router;