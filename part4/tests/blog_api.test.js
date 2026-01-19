const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Titulo1',
        author: 'Author1',
        url: 'url1',
        likes: 1,
        id: '69693b110e8628e7d01c9308',
    },
    {
        title: 'Titulo2',
        author: 'Author2',
        url: 'url2',
        likes: 2,
        id: '69694799e7d002b6f35d6da5',
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let newBlog = new Blog(blog)
        await newBlog.save()
    }
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

after(async () => {
    mongoose.connection.close()
})
