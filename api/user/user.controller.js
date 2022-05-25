const User = require('./user.model')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')


const createUser = async(req, res) => {
    let { password, username, name } = _.pick(req.body, ['password', 'username', 'name'])

    try {
        if (!password || !username || !name) {
            res.status(400).json({ error: 'name, username and password are required!' })
        }

        if (password && password.length < 7) {
            res.status(400).json({ error: 'Min password length should be atleast 7' })
        }

        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)
        const user = await User.create({ passwordHash, username, name })
        const userData = _.pick(user, ['_id', 'username'])
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
        console.log(accessToken)
        res.header('x-auth', `Bearer ${accessToken}`).json({ success: true, token: `Bearer ${accessToken}` })

    } catch (err) {
        console.log({ error: err })
        res.status(400).json({ Error: 'Some error' })
    }
}

const loginUser = async(req, res) => {
    let { password, username } = _.pick(req.body, ['username', 'password'])
    try {
        if (!password || !username) {
            return res.status(400).json({ error: 'Password and username are required!' })
        }


        const user = await User.find({ username })
        if (!user) {
            return res.status(400).json({ error: 'User not found!' })
        }
        console.log(user, password)
        const isValid = await bcrypt.compare(password, user[0].passwordHash)

        if (!isValid) {
            return res.status(400).json({ error: 'Invalid detail please check password and username!' })
        }

        const userData = _.pick(user[0], ['_id', 'username', 'name'])
        console.log(userData)
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            //console.log(accessToken)
        res.header('x-auth', `Bearer ${accessToken}`).json({ success: true, token: `Bearer ${accessToken}` })

    } catch (err) {
        console.log({ error: err })
        res.status(400).json({ Error: 'Some error' })
    }
}
module.exports = {
    createUser,
    loginUser
}