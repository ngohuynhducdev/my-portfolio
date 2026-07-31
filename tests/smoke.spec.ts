import { test, expect, type Page } from "@playwright/test";

const SECTIONS = ["about", "experience", "projects", "skills", "contact"];
const LABELS = ["About", "Experience", "Projects", "Skills", "Contact"];

/** Height of the fixed header — every scroll target should stop just below it. */
const HEADER = 64;

/** Jump without the smooth-scroll animation, for tests about where the page
 *  ends up rather than how it gets there. */
async function jumpTo(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
}

function activeLabel(page: Page) {
  return page
    .getByRole("navigation", { name: "Main" })
    .locator('button[aria-current="true"]');
}

test.describe("page", () => {
  test("renders the headline and every section", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Duc");
    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("logs no console errors", async ({ page }) => {
    const errors: string[] = [];
    // Vercel Analytics fetches /_vercel/insights/script.js, which only exists
    // once deployed — locally it always 404s and says nothing about the app.
    page.on("response", (r) => {
      if (r.status() >= 400 && !r.url().includes("/_vercel/")) {
        errors.push(`${r.status()} ${r.url()}`);
      }
    });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/");
    await jumpTo(page, 99999);
    await page.waitForTimeout(500);

    expect(errors).toEqual([]);
  });
});

test.describe("404", () => {
  test("keeps the navbar useful", async ({ page, isMobile }) => {
    await page.goto("/no-such-page");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Page not found",
    );
    // The skip link needs a target here too.
    await expect(page.locator("#main")).toHaveCount(1);

    // Sections don't exist on this route, so a nav click has to leave for the
    // home page rather than scroll nowhere.
    if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    const scope = isMobile
      ? page.locator("#mobile-menu")
      : page.getByRole("navigation", { name: "Main" });
    await scope.getByRole("button", { name: "Projects", exact: true }).click();

    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.locator("#projects")).toHaveCount(1);
  });

  test("marks no section as current", async ({ page }) => {
    await page.goto("/no-such-page");
    await expect(page.locator('button[aria-current="true"]')).toHaveCount(0);
  });
});

test.describe("skip link", () => {
  test("is the first tab stop and lands on main", async ({ page }) => {
    await page.goto("/");
    const skip = page.getByRole("link", { name: "Skip to content" });

    // Off-screen until focused, so it must not cover the header at rest.
    expect((await skip.boundingBox())!.y).toBeLessThan(0);

    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await expect
      .poll(async () => (await skip.boundingBox())!.y)
      .toBeGreaterThan(0);

    await expect(page.locator("#main")).toHaveCount(1);
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => !!isMobile, "desktop nav is hidden on mobile");

  for (const [i, label] of LABELS.entries()) {
    test(`"${label}" scrolls its section under the header`, async ({ page }) => {
      await page.goto("/");
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("button", { name: label, exact: true })
        .click();

      const section = page.locator(`#${SECTIONS[i]}`);
      // Contact is the last section: the page bottoms out before it can reach
      // the header, so it only has to be on screen.
      const settled = async () => Math.round((await section.boundingBox())!.y);
      if (i < LABELS.length - 1) {
        await expect.poll(settled).toBe(HEADER);
      } else {
        await expect.poll(settled).toBeLessThan(page.viewportSize()!.height);
      }
    });
  }

  test("active link follows the scroll in both directions", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(activeLabel(page)).toHaveText("About");

    const stops: number[] = [];
    for (const id of SECTIONS.slice(1)) {
      stops.push(
        await page.locator(`#${id}`).evaluate((el) => {
          const s = el as HTMLElement;
          return s.offsetTop + 100;
        }),
      );
    }

    // Down: every link takes its turn.
    const seen: string[] = ["About"];
    for (const y of stops) {
      await jumpTo(page, y);
      await expect.poll(() => activeLabel(page).textContent()).not.toBe(
        seen.at(-1),
      );
      seen.push((await activeLabel(page).textContent())!);
    }
    expect(seen).toEqual(LABELS);

    // Up: hitting the bottom pins "Contact", and scrolling back used to leave
    // it stuck there because the observer emits no entry for a section that
    // never left the band.
    await jumpTo(page, 99999);
    await expect(activeLabel(page)).toHaveText("Contact");

    await jumpTo(page, stops[stops.length - 2]); // back into Skills
    await expect(activeLabel(page)).toHaveText("Skills");

    await jumpTo(page, 0);
    await expect(activeLabel(page)).toHaveText("About");
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "menu only exists below md");

  test("opens, navigates, and closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();

    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();

    await menu.getByRole("button", { name: "Projects", exact: true }).click();

    await expect(menu).toBeHidden();
    await expect
      .poll(async () => Math.round((await page.locator("#projects").boundingBox())!.y))
      .toBe(HEADER);
  });

  test('"Hire Me" reaches the contact section', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .locator("#mobile-menu")
      .getByRole("button", { name: "Hire Me" })
      .click();

    await expect
      .poll(async () => (await page.locator("#contact").boundingBox())!.y)
      .toBeLessThan(page.viewportSize()!.height);
  });
});
