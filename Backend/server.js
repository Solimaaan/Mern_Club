require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const membershipsRoutes = require('./routes/memberships')
const sportsRoutes = require('./routes/sports')
const userRoute = require('./routes/users')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path,req.method)
    next()
})

//Routes
app.use('/api/memberships',membershipsRoutes)
app.use('/api/sports',sportsRoutes)
app.use('/api/user',userRoute)


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {// listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Successful connection to DB\nListening on port', process.env.PORT)
    })})
    .catch((error) => {
        console.log(error)
})



process.env