var User = require('../models/user.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require("../../config");
const moment = require("moment")
const { userMapper } = require('../mappers/user.mapper');

exports.create = function(req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hasPassword = bcrypt.hashSync(req.body.password, salt);
    User.createUser(req.body.email, req.body.pseudo, hasPassword).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(500).send(err);
    })
};

exports.login = function(req, res) {
    User.findUserByEmail(req.body.email).then((user) => {
        var isValidCredentials = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidCredentials) return res.status(400).send("Email or Password is wrong")
        var token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, expiresAt: moment().add(1, 'days').valueOf() }, config.TOKEN_SECRET);
        res.header("auth-token", token).send({ "token": token, "user": userMapper(user)});
    }).catch((e) => {
        console.log("mange tes morts !!")
        console.log(e)
        res.status(400).send("Email or Password is wrong")
    })
};

exports.getAll = function(req, res) {
    User.findAll().then((users) => {
        res.send({"users": users });
    })
}