import { expect, test } from "@playwright/test"

import { COLOUR_SCHEMES } from "../constants.ts"

test.describe("footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  COLOUR_SCHEMES.forEach((colourScheme) => {
    test.describe(`${colourScheme} mode`, () => {
      test.use({ colorScheme: colourScheme })

      test("matches the saved screenshot", async ({ page }) => {
        const footer = page.locator("footer")
        await expect(footer).toHaveScreenshot(`${colourScheme}.webp`, {
          scale: "device",
        })
      })
    })
  })
})
