const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'user1',
        name: 'user1',
        password: 'test',
    },
    {
        username: 'user2',
        name: 'user2',
        password: 'test2',
    },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map((b) => b.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
}

module.exports = { blogsInDB, initialBlogs, usersInDB, initialUsers }
