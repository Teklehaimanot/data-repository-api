const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
const mongoose = require('mongoose')
require('dotenv/config')


app.use(express.json())

app.get('/', (req, res) => {
    res.send('we are on home page')
})

app.use('/api/user', require('./api/user/user.router'))


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))


app.listen(process.env.PORT, () => {
    console.log('server started')
})