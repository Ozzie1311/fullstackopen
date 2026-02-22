const { test, expect, describe, beforeEach } = require('@playwright/test')
import { loginWith, createBlog, createSeveralBlogs } from './helper'

const mockBlog = {
  title: 'Title playwright',
  author: 'Author playwright',
  url: 'Url playwright',
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Oswaldo Rodriguez',
        username: 'Oswaldo',
        password: '123456',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs', { exact: true })
    await expect(locator).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'Oswaldo', 'wrong')
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')

    await expect(
      page.getByText('Oswaldo Rodriguez logged in'),
    ).not.toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Oswaldo', '123456')
    })

    test('login form is shown', async ({ page }) => {
      const username = await page.getByTestId('username')
      const password = await page.getByTestId('password')
      const button = await page.getByRole('button', { name: 'login' })

      await expect(username).toBeVisible()
      await expect(password).toBeVisible()
      await expect(button).toBeVisible()
    })

    describe('Already logged', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, mockBlog.title, mockBlog.author, mockBlog.url)
      })

      test('succeeds with correct credentials', async ({ page }) => {
        await expect(
          page.getByText('Oswaldo Rodriguez logged in'),
        ).toBeVisible()
      })

      test('a new blog can be created', async ({ page }) => {
        await expect(page.getByText('title playwright')).toBeVisible()
      })

      test('a blog details can be showed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'hide' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      })

      test('a blog details can be hided', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'hide' }).click()
        await expect(
          page.getByRole('button', { name: 'hide' }),
        ).not.toBeVisible()
        await expect(
          page.getByRole('button', { name: 'like' }),
        ).not.toBeVisible()
        await expect(
          page.getByRole('button', { name: 'remove' }),
        ).not.toBeVisible()
        await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
      })

      test('a blog can be editted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        const likesAtStart = page.getByText('Likes')

        const likeButton = page.getByRole('button', { name: 'like' })
        await likeButton.click()

        await expect(page.getByText('Likes: 1')).toBeVisible()

        await likeButton.click()
        await expect(page.getByText('Likes: 2')).toBeVisible()
      })

      describe('Security', () => {
        test('a blog can be deleted only by the author', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          page.on('dialog', async (dialog) => {
            await dialog.accept()
          })
          await page.getByRole('button', { name: 'remove' }).click()
          await expect(page.getByText(mockBlog.title)).not.toBeVisible()
        })

        test('only the creator of the blog can see the delete button', async ({
          page,
          request,
        }) => {
          await page.getByRole('button', { name: 'logout' }).click()
          await request.post('http:/localhost:3001/api/users', {
            data: {
              name: 'test User',
              username: 'testing',
              password: '123456',
            },
          })
          await loginWith(page, 'testing', '123456')
          await page.getByRole('button', { name: 'view' }).click()
          const removeButton = page.getByRole('button', { name: 'remove' })
          await expect(removeButton).not.toBeVisible()
        })
      })
    })
    describe('Visual order', () => {
      test('blogs are sorted by likes number', async ({ page }) => {
        await createSeveralBlogs(page, 3)
        await expect(page.getByText('title 0')).toBeVisible()
        await expect(page.getByText('title 1')).toBeVisible()
        await expect(page.getByText('title 2')).toBeVisible()

        const likeBlog = async (title, clicks) => {
          const blogContainer = page.locator('.blog', { hasText: title })
          await blogContainer.getByRole('button', { name: 'view' }).click()
          const likeButton = blogContainer.getByRole('button', { name: 'like' })

          for (let i = 0; i < clicks; i++) {
            await likeButton.click()

            await page.waitForTimeout(500)
          }
          await blogContainer.getByRole('button', { name: 'hide' }).click()
        }
        await likeBlog('title 1', 3)
        await likeBlog('title 2', 2)

        await page.waitForTimeout(500)
        const blogLocators = page.locator('.blog')
        await expect(blogLocators.nth(0)).toContainText('title 1')
        await expect(blogLocators.nth(1)).toContainText('title 2')
        await expect(blogLocators.nth(2)).toContainText('title 0')
      })
    })
  })
})
