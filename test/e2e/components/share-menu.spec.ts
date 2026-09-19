import { expect, test } from "@playwright/test"

test.describe("share menu", () => {
  test.describe("when JavaScript is enabled", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        "/2015/12/30/the-death-of-impeg-2-data-and-the-false-start-of-ipsitables/",
      )
    })

    test("can open the share menu", async ({ page }) => {
      await page.getByRole("button", { name: "Share" }).click()

      await expect(
        page.getByRole("menuitem", { name: "Copy link" }),
      ).toBeVisible()
    })

    test("can share on Bluesky", async ({ browserName, context, page }) => {
      test.skip(browserName == "webkit", "Test is unreliable on WebKit")

      await context.route(/^https:\/\/bsky.app/, (route) =>
        route.fulfill({
          status: 404,
          body: "Intercepted",
          contentType: "text/plain",
        }),
      )

      await page.getByRole("button", { name: "Share" }).click()

      const newTabPromise = page.waitForEvent("popup")

      await page.getByRole("menuitem", { name: "Bluesky" }).click()

      const newTab = await newTabPromise
      await expect(newTab).toHaveURL(
        "https://bsky.app/intent/compose?text=The%20death%20of%20IMpeg2Data%20and%20the%20false%20start%20of%20IPSITables%20https%3A%2F%2Fblog.yuo.be%2F2015%2F12%2F30%2Fthe-death-of-impeg-2-data-and-the-false-start-of-ipsitables%2F",
      )
      await newTab.close()
    })

    test("the menu matches the saved screenshot", async ({ page }) => {
      await page.getByRole("button", { name: "Share" }).click()
      await page.getByRole("menuitem", { name: "Copy link" }).hover()

      await expect(page.getByRole("menu")).toHaveScreenshot("share-menu.png", {
        scale: "device",
      })
    })
  })

  test.describe("when JavaScript is disabled", () => {
    test.use({ javaScriptEnabled: false })

    test.beforeEach(async ({ page }) => {
      await page.goto("/")
    })

    test("share menu is not visible", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Share" }),
      ).not.toBeVisible()
    })
  })
})
