const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: Schema.ObjectId,
    pseudo: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('users', userSchema)
var UserModel = mongoose.model('users');

User.createUser = function (email, pseudo, password) {
    let user = new UserModel({ pseudo: pseudo, email: email, password: password }).save(function (err) {
        console.log("User[create]")
        if (err) { throw err; }
        console.log('user created !');
    });
    return user;
}

User.findAll = function () {
    let users = null
    UserModel.find(null, function (err, usersData) {
        console.log("User[findAll]")
        if (err) { throw err; }
        users = usersData
        console.log("User found: " + usersData.length)
    })
    return users;
}

User.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: email }, function (err, usersData) {
            console.log("User[findUserByEmail]")
            if (err) { throw err; }
            if (usersData != undefined) {
                console.log("User found!")
                resolve(usersData)
            } else {
                console.log("No user found with email: " + email)
                reject()
            }
        })
    })
}

/* 
UPDATE
var options is an hash
{psuedo, email, isAdmin}
*/
User.updateUser = function (uid, options) {
    let status = null
    UserModel.update({ _id: uid }, { pseudo: options.pseudo, email: options.email, isAdmin: options.isAdmin }, function (err, response) {
        console.log("User[update]")
        if (err) { throw err; }
        status = response
        console.log("user updated !")
    })
    return status
}

User.deleteUser = function (uid) {
    let status = null
    UserModel.remove({ _id: uid }, function (err, response) {
        console.log("User[delete]")
        if (err) { throw err; }
        status = response
        console.log("user deleted !")
    })
}

module.exports = User