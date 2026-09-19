import { expect, type Page, test } from "@playwright/test"

async function clickOption(page: Page, name: string) {
  await page.getByRole("combobox", { name: "Theme" }).click()
  await page.getByRole("option", { name }).click()
}

test.describe("theme selector", () => {
  test.describe("when JavaScript is enabled", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/")
    })

    test("can switch between themes", async ({ page }) => {
      const htmlLocator = page.locator("html")
      await expect(htmlLocator).toHaveClass("auto")

      await clickOption(page, "Light")
      await expect(htmlLocator).toHaveClass("light")

      await clickOption(page, "Dark")
      await expect(htmlLocator).toHaveClass("dark")

      await clickOption(page, "Automatic")
      await expect(htmlLocator).toHaveClass("auto")
    })

    test("remembers the theme after refreshing", async ({ page }) => {
      const htmlLocator = page.locator("html")
      await expect(htmlLocator).toHaveClass("auto")

      await clickOption(page, "Light")
      await expect(htmlLocator).toHaveClass("light")

      await page.reload()
      await expect(htmlLocator).toHaveClass("light")
    })

    test("the menu matches the saved screenshot", async ({ page }) => {
      await page.getByRole("combobox", { name: "Theme" }).click()

      await expect(
        page.getByRole("listbox", { name: "Theme" }),
      ).toHaveScreenshot("theme-selector-menu.png", { scale: "device" })
    })
  })

  test.describe("when JavaScript is disabled", () => {
    test.use({ javaScriptEnabled: false })

    test.beforeEach(async ({ page }) => {
      await page.goto("/")
    })

    test("defaults to auto theme and hides the theme selector", async ({
      page,
    }) => {
      await expect(page.locator("html")).toHaveClass("auto")
      await expect(
        page.getByRole("combobox", { name: "Theme" }),
      ).not.toBeVisible()
    })
  })
})
