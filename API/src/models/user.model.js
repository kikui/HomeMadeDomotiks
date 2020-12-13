const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {userMapper} = require('../mappers/user.mapper')

const userSchema = new Schema({
    uid: Schema.ObjectId,
    pseudo: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('users', userSchema)
var UserModel = mongoose.model('users');

User.createUser = (email, pseudo, password) => {
    return new Promise((resolve, reject) => {
        new UserModel({ pseudo: pseudo, email: email, password: password }).save(function (err, user) {
            console.log("User[create]")
            if (err) { 
                reject(err); 
            } else {
                console.log('user created !');
                resolve(userMapper(user));
            }
        });
    })
}

User.findAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.find(null, function (err, usersData) {
            console.log("User[findAll]")
            if (err) {
                reject(err); 
            } else {
                console.log("User found: " + usersData.length)
                users = []
                usersData.forEach(user => {
                    users.push(userMapper(user))
                });
                resolve(users)
            }
        })
    })
}

User.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: email }, function (err, usersData) {
            console.log("User[findUserByEmail]")
            if (err) { throw err; }
            if (usersData != undefined) {
                console.log("User found!")
                resolve(userMapper(usersData))
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
User.updateUser = (uid, options) => {
    return new Promise((revolve, reject) => {
        UserModel.update({ _id: uid }, { pseudo: options.pseudo, email: options.email, isAdmin: options.isAdmin }, function (err, response) {
            console.log("User[update]")
            if (err) { 
                reject(err); 
            } else {
                console.log("user updated !")
                resolve(response)
            }
        })
    })
}

User.deleteUser = (uid) => {
    return new Promise((revolve, reject) => {
        UserModel.remove({ _id: uid }, function (err, response) {
            console.log("User[delete]")
            if (err) { 
                reject(err) 
            } else {
                console.log("user deleted !")
                revolve(response)
            }
        })
    })
}

module.exports = User