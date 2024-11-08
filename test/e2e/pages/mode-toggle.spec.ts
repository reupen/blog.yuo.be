import { expect, test } from "@playwright/test"

test.describe("mode toggle", () => {
  test.describe("when JavaScript is enabled", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/")
    })

    test("can switch between modes", async ({ page }) => {
      const htmlLocator = page.locator("html")
      await expect(htmlLocator).toHaveClass("auto")

      await page.getByRole("button", { name: "Switch to dark mode" }).click()
      await expect(htmlLocator).toHaveClass("dark")

      await page.getByRole("button", { name: "Switch to light mode" }).click()
      await expect(htmlLocator).toHaveClass("light")

      await expect(
        page.getByRole("button", {
          name: "Switch to automatic light or dark mode",
        }),
      ).toBeVisible()
    })
  })

  test.describe("when JavaScript is disabled", () => {
    test.use({ javaScriptEnabled: false })

    test.beforeEach(async ({ page }) => {
      await page.goto("/")
    })

    test("defaults to auto mode and hides the mode toggle button", async ({
      page,
    }) => {
      await expect(page.locator("html")).toHaveClass("auto")
      await expect(page.locator("#mode-toggle")).toBeHidden()
    })
  })
})
