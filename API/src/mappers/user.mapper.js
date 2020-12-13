exports.userMapper = function(user) {
    return {
        id: user._id,
        pseudo: user.pseudo,
        email: user.email,
        isAdmin: user.isAdmin
    }
}