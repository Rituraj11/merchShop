var express = require('express')
var router = express.Router()
const { check } = require('express-validator');

const {signup, signout, signin, isSignIn} = require('../controllers/auth');

router.post('/signup',[
    check('name', 'Name should be atleast of 3 char').isLength({ min: 3}),
    check('email','Invalid email').isEmail(),
    check('password', 'Password must be more than 4 char').isLength({ min: 4})
], signup)

router.post('/signin',[
    check('email','Invalid email').isEmail(),
    check('password', 'password is required').isLength({ min: 4})
], signin)

router.get('/signout', signout)

router.get('/testroute',isSignIn, (req, res) => { res.json(req.profile)} )

module.exports = router;