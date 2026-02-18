import { useState } from 'react'
const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [isShown, setIsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 10,
  }
  return (
    <div style={blogStyle}>
      <div>
        <strong>Title: </strong> {blog.title}
        <button onClick={() => setIsShown(!isShown)}>
          {isShown ? 'hide' : 'view'}
        </button>
      </div>
      {isShown ? (
        <div>
          <p>
            <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
          </p>
          <div>
            <strong>Likes:</strong> {blog.likes}
            <button onClick={() => handleLikes(blog.id)}>like</button>
          </div>
          <p>{blog.user.name}</p>
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        </div>
      ) : null}
    </div>
  )
}

export default Blog
