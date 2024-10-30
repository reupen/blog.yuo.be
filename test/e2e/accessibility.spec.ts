import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

const PAGES = [
  "/",
  "/2/",
  "/2023/04/13/new-pc-build/",
  "/2015/12/30/the-death-of-impeg-2-data-and-the-false-start-of-ipsitables/",
]

PAGES.forEach((path) => {
  test.describe(path, () => {
    test("passes accessibility checks", async ({ page }) => {
      await page.goto(path)

      const axeResults = await new AxeBuilder({ page }).analyze() // 4

      expect(axeResults.violations).toEqual([])
    })
  })
})
