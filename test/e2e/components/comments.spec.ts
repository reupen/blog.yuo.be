import { expect, test } from "@playwright/test"

test.describe("comments widget", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/2015/12/30/the-death-of-impeg-2-data-and-the-false-start-of-ipsitables/",
    )
  })

  test("can show comments using the mouse", async ({ page }) => {
    const showCommentsLink = page.getByRole("button", {
      name: "Post a comment",
    })

    await showCommentsLink.click()

    await expect(showCommentsLink).not.toBeVisible()
    await expect(
      page.getByRole("button", { name: "Add a comment" }),
    ).toBeVisible({ timeout: 15_000 })
  })

  test("can show comments using the keyboard", async ({ page }) => {
    const showCommentsLink = page.getByRole("button", {
      name: "Post a comment",
    })

    await showCommentsLink.press("Enter")

    await expect(showCommentsLink).not.toBeVisible()
    await expect(
      page.getByRole("button", { name: "Add a comment" }),
    ).toBeVisible({ timeout: 15_000 })
  })
})
