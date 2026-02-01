const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB } = require('./test_helper')
const api = supertest(app)

const endpoint = '/api/blogs'

beforeEach(async () => {
    await Blog.deleteMany({})
    // for (let blog of initialBlogs) {
    //     let newBlog = new Blog(blog)
    //     await newBlog.save()
    // }
    await Blog.insertMany(initialBlogs)
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

    await api.post('/api/blogs').send(newBlog).expect(400)
})

test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await blogsInDB()
    const blogToDelete = blogs[0]

    await api.delete(`${endpoint}/${blogToDelete.id}`).expect(204)

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
