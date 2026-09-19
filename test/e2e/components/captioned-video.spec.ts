import { expect, test } from "@playwright/test"

test.describe("captioned video", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/2026/09/10/the-terrible-menu-bar-in-the-windows-11-notepad/",
    )
  })

  test("sets the <source> type attribute", async ({ page }) => {
    const firstSource = page.locator("video > source").first()
    await expect(firstSource).toHaveAttribute(
      "type",
      'video/mp4; codecs="av01.0.05M.08"',
    )
  })
})
