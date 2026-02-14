const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
require('dotenv').config
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB } = require('./test_helper')
const api = supertest(app)

const endpoint = '/api/blogs'
let token = null

beforeEach(async () => {
    await Blog.deleteMany({}) //Borramos blogs de la base de datos
    await User.deleteMany({}) //Borramos usuarios de la base de datos

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save() //Guardamos el usuario que acabamos de crear

    const userForToken = {
        //Generando el token
        username: user.username,
        id: user._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)

    const blogs = initialBlogs.map((b) => {
        return new Blog({ ...b, user: user._id })
    })

    const promiseArray = blogs.map((b) => b.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier of blog is called id', async () => {
    const response = await api.get('/api/blogs')

    const blogFromApi = response.body[0]

    const blogsInDB = await Blog.find({})
    const blogFromDB = blogsInDB[0]

    assert(blogFromApi.id)
    assert.strictEqual(blogFromApi.id, blogFromDB._id.toString())
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 3,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogsTitles = response.body.map((b) => b.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(blogsTitles.includes(newBlog.title))
})

test('likes property is missing', async () => {
    const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
    }

    const result = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)
})

test('fails with status code 400 if url or title is missing', async () => {
    const newBlog = {
        author: 'test author',
        url: 'url test',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(newBlog)
        .expect(400)
})

test('adding a blog fails with status code 401 if token is not provided', async () => {
    const blogsAtStart = await blogsInDB()

    const newBlog = {
        title: 'Blog without permission',
        author: 'Hacker',
        url: 'www.hacker.com',
        likes: 0,
    }

    await api
        .post(endpoint)
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await blogsInDB()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await blogsInDB()
    const blogToDelete = blogs[0]

    await api
        .delete(`${endpoint}/${blogToDelete.id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(204)

    const blogsInEnd = await blogsInDB()

    const titles = blogsInEnd.map((b) => b.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsInEnd.length, initialBlogs.length - 1)
})

describe('update a unique blog', () => {
    test('succeeds with status 200 if id is valid', async () => {
        const blogsAtStart = await blogsInDB()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            likes: blogToUpdate.likes + 1,
        }

        await api
            .put(`${endpoint}/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)

        const blogsInEnd = await blogsInDB()
        const updatedBlog = blogsInEnd.find(
            (blog) => blog.id === blogToUpdate.id,
        )

        assert.strictEqual(updatedBlog.likes, newBlog.likes)
    })
})

after(async () => {
    mongoose.connection.close()
})
