const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogList = await Blog.find({})
    response.json(blogList)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    const newBlog = new Blog({
        title,
        author,
        url,
        likes,
    })

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
