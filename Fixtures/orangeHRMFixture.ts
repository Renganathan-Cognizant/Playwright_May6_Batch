import { test as baseTest, Browser, BrowserContext, Page, chromium, expect } from '@playwright/test';

// ============================================================
// orangeHRMFixture.ts
//
// Defines two fixtures against the OrangeHRM demo site:
//
//  ┌─ TEST FIXTURE  : "loginPage"
//  │   • Scope  : test  (re-runs for every single test)
//  │   • Setup  : opens a fresh browser page & navigates to login URL
//  │   • Teardown: logs out, then closes the page
//  │
//  └─ WORKER FIXTURE: "loggedInPage"
//      • Scope  : worker (runs ONCE per Playwright worker process)
//      • Setup  : launches browser, logs in as Admin, yields the page
//      • Teardown: closes browser after all tests in the worker finish
//
// Why two scopes?
//   - test  fixture → guarantees isolation: each test gets a clean slate
//   - worker fixture → saves time: login happens once, shared across tests
// ============================================================

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERNAME  = 'Admin';
const PASSWORD  = 'admin123';

// ── Custom fixture types ─────────────────────────────────────

/** Test-scoped fixture — provides a Page already on the login screen */
type TestFixtures = {
    loginPage: Page;
};

/** Worker-scoped fixture — provides a Page that is already logged in */
type WorkerFixtures = {
    loggedInPage: Page;
};

// ── Extend base test ─────────────────────────────────────────
export const test = baseTest.extend<TestFixtures, WorkerFixtures>({

    // =========================================================
    // TEST FIXTURE  — "loginPage"
    // Scope: test  →  setup + teardown runs for EVERY test
    // =========================================================


    loginPage: async ({}, use) => {
        // ── SETUP (before use) ────────────────────────────────
        console.log('\n[TEST FIXTURE] Setup: launching browser for this test');

        const browser: Browser  = await chromium.launch({ headless: false, slowMo: 40 });
        const context: BrowserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        const page: Page        = await context.newPage();

        await page.goto(BASE_URL);
        await page.waitForLoadState('domcontentloaded');
        console.log('[TEST FIXTURE] ✅ Setup complete — login page ready');

        // ── YIELD to test ─────────────────────────────────────
        await use(page);

        // ── TEARDOWN (after use) ──────────────────────────────
        console.log('[TEST FIXTURE] ▶ Teardown: closing browser for this test');
        await context.close();
        await browser.close();
        console.log('[TEST FIXTURE] ✅ Teardown complete\n');
    },

    // =========================================================
    // WORKER FIXTURE — "loggedInPage"
    // Scope: worker  →  setup runs ONCE, shared across ALL tests
    //                    in the same worker process
    // =========================================================
    loggedInPage: [
        async ({}, use) => {
            // ── SETUP (once per worker) ───────────────────────
            console.log('\n[WORKER FIXTURE] ▶ Setup: launching browser & logging in ONCE for this worker');

            const browser: Browser  = await chromium.launch({ headless: false, slowMo: 40 });
            const context: BrowserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
            const page: Page        = await context.newPage();

            // Navigate and log in
            await page.goto(BASE_URL);
            await page.waitForLoadState('domcontentloaded');
            await page.getByPlaceholder('Username').fill(USERNAME);
            await page.getByPlaceholder('Password').fill(PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();

            // Wait for the Dashboard to confirm login
            await expect(
                page.getByRole('heading', { name: 'Dashboard' })
            ).toBeVisible({ timeout: 10_000 });

            console.log('[WORKER FIXTURE] ✅ Setup complete — logged in, Dashboard visible');

            // ── YIELD to every test in this worker ────────────
            await use(page);

            // ── TEARDOWN (once per worker, after last test) ───
            console.log('\n[WORKER FIXTURE] ▶ Teardown: closing browser for this worker');
            await context.close();
            await browser.close();
            console.log('[WORKER FIXTURE] ✅ Teardown complete\n');
        },
        { scope: 'worker' }   // ← this single option switches scope to worker
    ],
});

export { expect };
