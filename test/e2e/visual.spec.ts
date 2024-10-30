import { expect, test } from "@playwright/test"

const PAGES = [
  "/2015/12/30/the-death-of-impeg-2-data-and-the-false-start-of-ipsitables/",
]

PAGES.forEach((path) => {
  test.describe(path, () => {
    test("matches the saved screenshot", async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveScreenshot(
        [path.replaceAll(/(^\/|\/$)/g, ""), "screenshot.png"],
        {
          fullPage: true,
        },
      )
    })
  })
})
