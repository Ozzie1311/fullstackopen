const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    console.log(username, password)

    const user = await User.findOne({ username })

    console.log('Password recibido', password)
    console.log('Usuario encontrado', user)
    console.log('Hash del usuario', user?.passwordHash)

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = { username: user.username, id: user._id }

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
    })

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
