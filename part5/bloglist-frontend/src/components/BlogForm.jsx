import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [userTitle, setUserTitle] = useState('')
  const [userAuthor, setUserAuthor] = useState('')
  const [userUrl, setUserUrl] = useState('')

  const cleanBlogForm = () => {
    setUserTitle('')
    setUserAuthor('')
    setUserUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: userTitle, author: userAuthor, url: userUrl })
    cleanBlogForm()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
          title
          <input
            value={userTitle}
            onChange={({ target }) => setUserTitle(target.value)}
          />
        </label>
        <label>
          author
          <input
            value={userAuthor}
            onChange={({ target }) => setUserAuthor(target.value)}
          />
        </label>
        <label>
          url
          <input
            value={userUrl}
            onChange={({ target }) => setUserUrl(target.value)}
          />
        </label>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
