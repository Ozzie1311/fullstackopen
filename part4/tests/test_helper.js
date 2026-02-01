const Blog = require('../models/blog')

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

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map((b) => b.toJSON())
}

module.exports = { blogsInDB, initialBlogs }
