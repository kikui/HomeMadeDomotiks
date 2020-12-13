const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: Schema.ObjectId,
    pseudo: String,
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('users', userSchema)
var UserModel = mongoose.model('users');

User.createUser = function (email, pseudo) {
    let user = new UserModel({ pseudo: pseudo, email: email }).save(function (err) {
        console.log("User[create]")
        if (err) { throw err; }
        console.log('user created !');
    });
    return user;
}

User.findAll = function() {
    let users = null
    UserModel.find(null, function(err, usersData) {
        console.log("User[findAll]")
        if (err) { throw err; }
        users = usersData
        console.log("User finded: " + usersData.length)
    })
    return users; 
}

User.findUserByEmail = function (email) {
    let user = null;
    UserModel.find({email: email}, function(err, usersData) {
        console.log("User[findUserByEmail]")
        if (err) { throw err; }
        if (usersData.length > 0) {
            user = usersData[0]
            console.log("User finded: " + usersData.length)
        } else {
            console.log("No user finded with email: " + email)
        }
    })
    return user;
}

/* 
UPDATE
var options is an hash
{psuedo, email, isAdmin}
*/
User.updateUser = function(uid, options) {
    let status = null
    UserModel.update({_id: uid}, {pseudo: options.pseudo, email: options.email, isAdmin: options.isAdmin}, function(err, response) {
        console.log("User[update]")
        if (err) { throw err; }
        status = response
        console.log("user updated !")
    })
    return status
}

User.deleteUser = function(uid) {
    let status = null
    UserModel.remove({_id: uid}, function(err, response) {
        console.log("User[delete]")
        if(err) { throw err; }
        status = response
        console.log("user deleted !")
    })
}

module.exports = User