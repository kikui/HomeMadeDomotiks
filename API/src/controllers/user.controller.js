var User = require('../models/user.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require("../../config");

exports.create = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hasPassword = bcrypt.hashSync(req.body.password, salt);

    try {
        var user = User.createUser(req.body.email, req.body.pseudo, hasPassword);
        res.send(user);
    } catch {
        res.status(500).send(err);
    }
};

exports.login = function(req, res) {
    User.findUserByEmail(req.body.email).then((user) => {
        var isValidCredentials = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidCredentials) return res.status(400).send("Email or Password is wrong")
        var token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.TOKEN_SECRET);
        res.header("auth-token", token).send({ "token": token, "user": user });
    }).catch(() => {
        console.log("mange tes morts !!")
        res.status(400).send("Email or Password is wrong")
    })
};