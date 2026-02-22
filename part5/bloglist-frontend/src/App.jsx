import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogUser')
        if (loggedUser) {
            const userFromStorage = JSON.parse(loggedUser)
            setUser(userFromStorage)
            blogService.setToken(userFromStorage.token)
        }
    }, [])

    const handleFormLogin = async (userObject) => {
        try {
            const user = await loginService.login(userObject)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        } catch {
            notificationMessage('wrong credentials')
        }
    }

    const notificationMessage = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleBlogForm = (blogObject) => {
        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog))
            notificationMessage(`a new blog  by ${returnedBlog.author} added`)
        })
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        window.localStorage.clear()
        setUser(null)
    }

    const handleLikeButton = async (id) => {
        const blog = blogs.find((blog) => blog.id === id)
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        }
        const returnedBlog = await blogService.update(id, updatedBlog)
        setBlogs(
            blogs.map((blog) =>
                blog.id !== id ? blog : { ...returnedBlog, user: blog.user }
            )
        )
    }

    const deleteBlog = async (id) => {
        const findBlog = await blogs.find((blog) => blog.id === id)
        if (
            window.confirm(
                `Remove blog ${findBlog.title} by ${findBlog.author}`
            )
        ) {
            try {
                await blogService.deleteBlog(id)
                setBlogs(blogs.filter((blog) => blog.id !== id))
            } catch {
                setErrorMessage('Cannot eliminate the blog')
            }
        }
    }

    const sortedBlogsByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>blogs</h2>
            {errorMessage && <Notification message={errorMessage} />}
            {user === null ? (
                <Togglable buttonLabel="Login">
                    <LoginForm userLogin={handleFormLogin} />
                </Togglable>
            ) : (
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogout}>logout</button>
                    {user !== null && (
                        <Togglable buttonLabel="create new blog">
                            <BlogForm createBlog={handleBlogForm} />
                        </Togglable>
                    )}
                </div>
            )}
            {user !== null
                ? sortedBlogsByLikes.map((blog) => (
                      <Blog
                          handleLikes={handleLikeButton}
                          handleDelete={deleteBlog}
                          key={blog.id}
                          blog={blog}
                      />
                  ))
                : null}
        </div>
    )
}

export default App
