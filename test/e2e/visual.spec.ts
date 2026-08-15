import { expect, test } from "@playwright/test"

const PAGES = [
  "/2015/12/30/the-death-of-impeg-2-data-and-the-false-start-of-ipsitables/",
]

const COLOUR_SCHEMES = ["light", "dark"] as const

PAGES.forEach((path) => {
  COLOUR_SCHEMES.forEach((colourScheme) => {
    test.describe(`${colourScheme} mode`, () => {
      test.use({ colorScheme: colourScheme })

      test.describe(path, () => {
        test("matches the saved screenshot", async ({ page }) => {
          await page.goto(path)
          await expect(page).toHaveScreenshot(
            [path.replaceAll(/(^\/|\/$)/g, ""), `${colourScheme}.png`],
            {
              fullPage: true,
            },
          )
        })
      })
    })
  })
})
