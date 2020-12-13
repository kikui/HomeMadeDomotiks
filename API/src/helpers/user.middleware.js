const config = require("../../config");
const jwt = require("jsonwebtoken");

exports.loggedIn = function (req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Access Denied");

    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, config.TOKEN_SECRET);
        if (verified.isAdmin === false) {
            let req_url = req.baseUrl + req.route.path;
            if (req_url.includes("user/:id") && parseInt(req.params.id) !== verified.id) {
                return res.status(401).send("Unauthorized!");
            }
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}

exports.adminOnly = async function (req, res, next) {
    if (req.user.isAdmin === false) {
        return res.status(401).send("Access Denied");
    }
    next();
}