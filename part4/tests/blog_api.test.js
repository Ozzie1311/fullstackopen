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

after(async () => {
    mongoose.connection.close()
})
