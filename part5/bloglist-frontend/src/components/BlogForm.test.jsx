import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const mockBlog = {
    title: 'This is the mock title',
    author: 'This is the mock author',
    url: 'http://oswaldo.com',
    likes: 10,
    user: {
        name: 'Oswaldo Rodríguez',
    },
}

test('<BlogForm /> calls onSubmit', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={mockHandler} />)

    const title = screen.getByPlaceholderText('title...')
    const author = screen.getByPlaceholderText('author...')
    const url = screen.getByPlaceholderText('url...')

    const button = screen.getByText('create')

    await user.type(title, mockBlog.title)
    await user.type(author, mockBlog.author)
    await user.type(url, mockBlog.url)

    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)

    expect(mockHandler.mock.calls[0][0].title).toBe(mockBlog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(mockBlog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(mockBlog.url)
})
