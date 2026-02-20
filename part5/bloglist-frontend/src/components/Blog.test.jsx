import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const mockBlog = {
    title: 'This is the mock title',
    author: 'This is the mock author',
    url: 'http://oswaldo.com',
    likes: 10,
    user: {
        name: 'Oswaldo Rodríguez',
    },
}

test('renders title and author but not url, likes or ids', () => {
    const { container } = render(<Blog blog={mockBlog} />)

    const title = screen.getByText(mockBlog.title, { exact: false })
    const author = screen.getByText(mockBlog.author, { exact: false })

    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const div = container.querySelector('.togglableContent')
    expect(div).toBeNull()
})

test('url and likes are shown when user click the button view', async () => {
    render(<Blog blog={mockBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText(mockBlog.url, { exact: false })
    const likes = screen.getByText(mockBlog.likes, { exact: false })

    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
})

test('user clicks two times and handler is called two times', async () => {
    const mockHandler = vi.fn()

    render(<Blog blog={mockBlog} handleLikes={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
