const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const { usersInDB } = require('./test_helper')
const api = supertest(app)
const endpoint = '/api/users'

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash: passwordHash })
        await user.save()
    })

    test('creation fails with proper statuscode and message if username is not unique', async () => {
        const usersAtStart = await usersInDB()
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        const result = await api
            .post(endpoint)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDB()
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails if username is less than 3 characters', async () => {
        const usersAtStart = await usersInDB()
        const newUser = {
            username: 'al',
            name: 'Test',
            password: '12345',
        }
        const result = await api
            .post(endpoint)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDB()
        assert(
            result.body.error.includes(
                'username is required and must be at least 3 characters',
            ),
        )
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails if password is less than 3 characters', async () => {
        const usersAtStart = await usersInDB()
        const newUser = {
            username: 'user',
            name: 'test user',
            password: '12',
        }
        const result = await api
            .post(endpoint)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await usersInDB()
        assert(
            result.body.error.includes(
                'password is required and must be at least 3 characters long',
            ),
        )
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
