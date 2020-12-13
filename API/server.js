const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//-----------------------------------------------------------------ServerProperties
/* app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({ secret: "azerty" })) */

//-----------------------------------------------------------------MongooseConnexion
mongoose.connect('mongodb://localhost:27017/api', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(res => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

//-----------------------------------------------------------------RouteController
//app.use('/api/user', require('./src/controllers/users'))

/* app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function (err, req, res, next) {
    let data = {
        message: err.message,
        status: err.status || 500
    }

    res.status(data.status)

    res.format({
        json: () => { res.send(data) }
    })
})

app.listen(PORT, () => {
    console.log('Serveur démarré sur le port : ', PORT)
})
 */

//-----------------------------------------------------------------TestInRealTime

const User = require('./src/models/users.js');
//User.createUser('test@test.com', 'pseduo');
//User.findAll()
//User.findUserByEmail('test@test.com')
//User.updateUser("5fca97adf4489229681675d3", {pseudo: 'test', email: 'test@test2.com', isAdmin: true})
//User.deleteUser("5fca97adf4489229681675d3")