const _ = require('lodash')

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.length === 1
        ? blogs[0].likes
        : blogs.reduce((sum, item) => {
              return sum + item.likes
          }, 0)
}

const favoriteBlogs = (blogs) => {
    const numberOfLikes = Math.max(...blogs.map((b) => b.likes))
    const findedBlog = blogs.find((b) => b.likes === numberOfLikes)
    return findedBlog
}

const mostBlogs = (blogs) => {
    const authorCount = _.countBy(blogs, 'author')
    const authorsArray = _.map(authorCount, (count, author) => {
        return { author, blogs: count }
    })
    const mostBlogAuthor = _.maxBy(authorsArray, 'blogs')
    return mostBlogAuthor
}

module.exports = { totalLikes, favoriteBlogs, mostBlogs }
