import { expect, test } from "@playwright/test"

import { COLOUR_SCHEMES } from "../constants.ts"

test.describe("image grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/2026/03/26/im-not-a-fan-of-how-direct2d-renders-windows-11-emojis/",
    )
    await page
      .locator("astro-island", { hasText: "Chrome" })
      .first()
      .scrollIntoViewIfNeeded()
  })

  test.describe("when JavaScript is enabled", () => {
    COLOUR_SCHEMES.forEach((colourScheme) => {
      test.describe(`${colourScheme} mode`, () => {
        test.use({ colorScheme: colourScheme })

        test("initially matches the saved screenshot", async ({ page }) => {
          await expect(
            page.locator(".image-tabs-hydrated").first(),
          ).toHaveScreenshot(`${colourScheme}-initial.webp`, {
            scale: "device",
          })
        })

        test("a hovered tab matches the saved screenshot", async ({ page }) => {
          const chromeTabButton = page
            .getByRole("tab", { name: "Chrome" })
            .first()
          await chromeTabButton.hover()

          await expect(chromeTabButton).toHaveScreenshot(
            `${colourScheme}-tab-hover.webp`,
            {
              scale: "device",
            },
          )
        })

        test("a switched tab matches the saved screenshot", async ({
          page,
        }) => {
          await page.getByRole("tab", { name: "Chrome" }).first().click()

          await expect(
            page.locator(".image-tabs-hydrated").first(),
          ).toHaveScreenshot(`${colourScheme}-switched.webp`, {
            scale: "device",
          })
        })
      })
    })
  })

  test.describe("when JavaScript is disabled", () => {
    test.use({ javaScriptEnabled: false })

    COLOUR_SCHEMES.forEach((colourScheme) => {
      test.describe(`${colourScheme} mode`, () => {
        test.use({ colorScheme: colourScheme })

        test("matches the saved screenshot", async ({ page }) => {
          await expect(
            page.locator(".image-tabs-fallback").first(),
          ).toHaveScreenshot(`${colourScheme}-fallback.webp`, {
            scale: "device",
          })
        })
      })
    })
  })
})
