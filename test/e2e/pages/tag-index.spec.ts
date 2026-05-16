import { expect, test } from "@playwright/test"

import { SITE_TITLE } from "../constants.ts"

test.describe("/tag/win32/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tag/win32/")
  })

  test("can navigate to the next page", async ({ baseURL, page }) => {
    await page.getByRole("link", { name: "Older posts" }).click()

    await expect(page).toHaveTitle(
      `Posts tagged #win32 (page 2) – ${SITE_TITLE}`,
    )
    expect(page.url()).toBe(`${baseURL}/tag/win32/2/`)
  })

  test("can navigate to a post", async ({ page }) => {
    const link = page.getByRole("main").getByRole("link").first()
    const linkText = await link.textContent()
    await link.click()

    await expect(page).toHaveTitle(`${linkText} – ${SITE_TITLE}`)
  })
})

test.describe("/tag/win32/2/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tag/win32/2/")
  })

  test("can navigate to the previous page", async ({ baseURL, page }) => {
    await page.getByRole("link", { name: "Newer posts" }).click()

    await expect(page).toHaveTitle(`Posts tagged #win32 – ${SITE_TITLE}`)
    expect(page.url()).toBe(`${baseURL}/tag/win32/`)
  })
})
