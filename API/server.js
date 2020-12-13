const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//-----------------------------------------------------------------ServerProperties
app.use(bodyParser.json())
//-----------------------------------------------------------------MongooseConnexion
mongoose.connect('mongodb://localhost:27017/api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(res => console.log('Database Connected'))
    .catch(err => console.log(err));

//-----------------------------------------------------------------RoutesSetup
const userRoute = require('./src/routes/user.routes.js');
app.use('/api/user', userRoute)

app.use(function (req, res, next) {
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


//-----------------------------------------------------------------TestInRealTime
test()
async function test() {
    const User = require('./src/models/user.model.js');
    //await User.createUser('test@test.com', 'pseduo', "test");
    //User.findAll()
    //User.findUserByEmail('test@testefe.com')
    //User.updateUser("5fca97adf4489229681675d3", {pseudo: 'test', email: 'test@test2.com', isAdmin: true})
    //User.deleteUser("5fca97adf4489229681675d3")
}