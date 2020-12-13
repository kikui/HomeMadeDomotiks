const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {loggedIn, adminOnly} = require("../helpers/user.middleware");

router.post('/create', userController.create);
router.post('/login', userController.login);

module.exports = router;