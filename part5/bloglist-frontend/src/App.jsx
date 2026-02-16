import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userTitle, setUserTitle] = useState('')
  const [userAuthor, setUserAuthor] = useState('')
  const [userUrl, setUserUrl] = useState('')

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

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleFormLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleBlogForm}>
        <div>
          title
          <input
            type='text'
            value={userTitle}
            name='user_title'
            onChange={({ target }) => setUserTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={userAuthor}
            name='user_author'
            onChange={({ target }) => setUserAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={userUrl}
            name='user_url'
            onChange={({ target }) => setUserUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  const handleFormLogin = async (event) => {
    event.preventDefault()
    console.log('login with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notificationMessage('wrong credentials')
    }
  }

  const cleanBlogForm = () => {
    setUserTitle('')
    setUserAuthor('')
    setUserUrl('')
  }

  const notificationMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleBlogForm = (event) => {
    event.preventDefault()
    const newBlog = {
      title: userTitle,
      author: userAuthor,
      url: userUrl,
    }
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      cleanBlogForm()
      notificationMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      )
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <Notification message={errorMessage} />}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {user !== null && blogForm()}
        </div>
      )}
      {user !== null
        ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        : null}
    </div>
  )
}

export default App
