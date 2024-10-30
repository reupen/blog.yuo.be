import { expect, test } from "@playwright/test"

import { SITE_TITLE } from "../constants.ts"

test.describe("/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("can navigate to the next page", async ({ baseURL, page }) => {
    await page.getByRole("link", { name: "Older posts" }).click()

    await expect(page).toHaveTitle(`Page 2 – ${SITE_TITLE}`)
    expect(page.url()).toBe(`${baseURL}/2/`)
  })

  test("can navigate to an image", async ({ page }) => {
    const link = page.getByRole("link")
    const linkText = await link.textContent()
    await link.click()

    await expect(page).toHaveTitle(`${linkText} – ${SITE_TITLE}`)
  })
})

test.describe("/2/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/2/")
  })

  test("can navigate to the previous page", async ({ baseURL, page }) => {
    await page.getByRole("link", { name: "Newer posts" }).click()

    await expect(page).toHaveTitle(SITE_TITLE)
    expect(page.url()).toBe(`${baseURL}/`)
  })
})
