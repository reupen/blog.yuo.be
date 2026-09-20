import { expect, test } from "@playwright/test"

test.describe("external links", () => {
  test('sets rel="noreferrer" on an third-party link', async ({ page }) => {
    await page.goto(
      "/2026/09/10/the-terrible-menu-bar-in-the-windows-11-notepad/",
    )

    const thirdPartyLink = page.locator('a[href^="https://github.com"]').first()
    await expect(thirdPartyLink).toHaveAttribute("rel", "noreferrer")
  })

  test('does not set rel="noreferrer" on an internal link', async ({
    page,
  }) => {
    await page.goto(
      "/2026/09/17/capturing-saturn-with-a-canon-rf-800mm-f11-lens-once-more/",
    )

    const internalLink = page
      .getByRole("link", { name: "I had a go at" })
      .first()
    await expect(internalLink).not.toHaveAttribute("rel")
  })

  test('does not set rel="noreferrer" on first-party external link', async ({
    page,
  }) => {
    await page.goto("/2026/02/05/whats-new-in-columns-ui-320-and-330/")

    const internalLink = page.getByRole("link", { name: "Columns UI" }).first()
    await expect(internalLink).not.toHaveAttribute("rel")
  })
})
