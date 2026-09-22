import { expect, test } from "@playwright/test"

import { COLOUR_SCHEMES } from "../constants.ts"

test.describe("pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/2/")
  })

  COLOUR_SCHEMES.forEach((colourScheme) => {
    test.describe(`${colourScheme} mode`, () => {
      test.use({ colorScheme: colourScheme })

      test("newer link matches the saved screenshot", async ({ page }) => {
        const footer = page.getByRole("link", { name: "Newer" })
        await expect(footer).toHaveScreenshot(`newer-${colourScheme}.webp`, {
          scale: "device",
        })
      })

      test("older link matches the saved screenshot", async ({ page }) => {
        const footer = page.getByRole("link", { name: "Older" })
        await expect(footer).toHaveScreenshot(`older-${colourScheme}.webp`, {
          scale: "device",
        })
      })
    })
  })
})
