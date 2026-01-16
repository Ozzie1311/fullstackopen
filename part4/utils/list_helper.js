const dummy = (blogs) => {
    return 1
}

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

module.exports = { dummy, totalLikes, favoriteBlogs }
