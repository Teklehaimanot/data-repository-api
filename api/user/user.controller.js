const User = require('./user.model')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')


const createUser = async (req, res) => {
    let { password, username, name, role, father_name } = _.pick(req.body, ['password', 'username', 'name', 'role', 'father_name'])

    try {
        if (!password || !username || !name || !role || !father_name) {
            res.status(400).json({ error: 'name, username and password are required!' })
        }

        if (password && password.length < 7) {
            res.status(400).json({ error: 'Min password length should be atleast 7' })
        }

        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)
        const user = await User.create({ passwordHash, username, name, role, father_name })
        const userData = _.pick(user, ['_id', 'username'])
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
        console.log(accessToken)
        res.header('x-auth', `Bearer ${accessToken}`).json({ success: true, token: `Bearer ${accessToken}`, user: { passwordHash, username, name, role, father_name } })

    } catch (err) {
        console.log({ error: err })
        res.status(400).json({ Error: err.message })
    }
}

const loginUser = async (req, res) => {
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
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
        res.header('x-auth', `Bearer ${accessToken}`).json({ success: true, token: `Bearer ${accessToken}` })

    } catch (err) {
        console.log({ error: err })
        res.status(400).json({ Error: 'Some error' })
    }
}

const getAll = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }

}
const deleteUser = async (req, res) => {
    try {
        const find = await User.findById({ _id: req.params.userId })
        if (!find) {
            return res.status(404).json({ error: 'dataset not found' })
        }
        const deltedUser = await User.deleteOne({ _id: req.params.userId })
        res.status(200).json({
            success: true,
            user: deltedUser
        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
module.exports = {
    createUser,
    loginUser,
    getAll,
    deleteUser
}