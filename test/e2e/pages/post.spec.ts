import { expect, test } from "@playwright/test"

import { SITE_TITLE } from "../constants.ts"

test.describe("/2024/10/20/cahoot-an-awful-2fa-login-process/", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/2024/10/20/cahoot-an-awful-2fa-login-process/")
  })

  test("sets the page meta description tag", async ({ page }) => {
    const metaDescription = page.locator("meta[name=description]")
    await expect(metaDescription).toHaveAttribute(
      "content",
      "I’m happier when I can copy and paste one-time passwords.",
    )
  })

  test("can navigate to the previous post by link", async ({ page }) => {
    const previousPostTitle =
      "Everyday Windows annoyances: A lack of context menu focus"
    await page.getByText(previousPostTitle).click()

    await expect(page).toHaveTitle(`${previousPostTitle} – ${SITE_TITLE}`)
  })

  test("can navigate to the next post by link", async ({ page }) => {
    const nextPostTitle = "Goodbye, Ghost"
    await page.getByText(nextPostTitle).click()

    await expect(page).toHaveTitle(`${nextPostTitle} – ${SITE_TITLE}`)
  })

  test("can navigate to the index page", async ({ page }) => {
    await page.getByText("All posts").click()

    await expect(
      page.getByRole("link", { name: "Cahoot: An awful 2FA login process" }),
    ).toBeInViewport()
  })
})
