const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.getByPlaceholder('title...').fill(title)
  await page.getByPlaceholder('author...').fill(author)
  await page.getByPlaceholder('url...').fill(url)

  await page.getByRole('button', { name: 'create' }).click()
}

const createSeveralBlogs = async (page, count) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  for (let i = 0; i < count; i++) {
    const title = `title ${i}`
    await page.getByPlaceholder('title...').fill(title)
    await page.getByPlaceholder('author...').fill(`author ${i}`)
    await page.getByPlaceholder('url...').fill(`url ${i}`)
    await page.getByRole('button', { name: 'create' }).click()
    await page.waitForTimeout(500)
  }
}

export { loginWith, createBlog, createSeveralBlogs }
