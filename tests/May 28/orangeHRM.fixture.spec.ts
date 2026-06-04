// ============================================================
// orangeHRM.fixture.spec.ts
//
// Demonstrates TEST fixture vs WORKER fixture side-by-side.
//
// ── Console output you will see ──────────────────────────────
//
//  [WORKER FIXTURE] ▶ Setup: launching browser & logging in ONCE …
//  [WORKER FIXTURE] ✅ Setup complete — logged in, Dashboard visible
//
//  [TEST FIXTURE]   ▶ Setup: launching browser for this test
//  [TEST FIXTURE]   ✅ Setup complete — login page ready
//       TC01 body …
//  [TEST FIXTURE]   ▶ Teardown: closing browser for this test
//
//  [TEST FIXTURE]   ▶ Setup: launching browser for this test   ← new browser!
//       TC02 body …
//  [TEST FIXTURE]   ▶ Teardown: closing browser for this test
//
//  [TEST FIXTURE]   ▶ Setup: launching browser for this test   ← new browser!
//       TC03 body …
//  [TEST FIXTURE]   ▶ Teardown: closing browser for this test
//
//  [WORKER FIXTURE] ▶ Teardown: closing browser for this worker ← only once!
//
// ── Key observations ─────────────────────────────────────────
//  • "TEST FIXTURE setup/teardown"   prints 3 times  (once per test)
//  • "WORKER FIXTURE setup/teardown" prints 1 time   (once for all 3 tests)
// ============================================================

import { test, expect } from '../../Fixtures/orangeHRMFixture';

// ── Shared constants ─────────────────────────────────────────
const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERNAME  = 'Admin';
const PASSWORD  = 'admin123';

// ===========================================================
// SECTION A — TEST FIXTURE  ("loginPage")
//
// Each test below receives a brand-new browser + page that is
// already on the OrangeHRM login screen.
// The browser is created → test runs → browser is closed.
// This cycle repeats for EVERY test independently.
// ===========================================================
test.describe('🔵 TEST FIXTURE — loginPage (re-runs per test)', () => {

    // ── TC01 ────────────────────────────────────────────────
    test('TC01 — Login with valid credentials and verify Dashboard', async ({ loginPage }) => {
        console.log('\n===== TC01 body running =====');

        // loginPage is already on the OrangeHRM login URL
        await loginPage.getByPlaceholder('Username').fill(USERNAME);
        await loginPage.getByPlaceholder('Password').fill(PASSWORD);
        await loginPage.getByRole('button', { name: 'Login' }).click();

        // Assert Dashboard heading
        await expect(
            loginPage.getByRole('heading', { name: 'Dashboard' })
        ).toBeVisible({ timeout: 10_000 });

        console.log('✅ TC01 — Dashboard heading verified');
    });

    // ── TC02 ────────────────────────────────────────────────
    test('TC02 — Login with invalid password and verify error message', async ({ loginPage }) => {
        console.log('\n===== TC02 body running =====');

        // loginPage fixture creates a FRESH browser for this test
        await loginPage.getByPlaceholder('Username').fill(USERNAME);
        await loginPage.getByPlaceholder('Password').fill('wrong_password');
        await loginPage.getByRole('button', { name: 'Login' }).click();

        // Assert error message is shown
        const errorMsg = loginPage.locator('.oxd-alert-content-text');
        await expect(errorMsg).toBeVisible({ timeout: 8_000 });
        await expect(errorMsg).toContainText('Invalid credentials');

        console.log('✅ TC02 — Invalid login error verified');
    });

    // ── TC03 ────────────────────────────────────────────────
    test('TC03 — Login and verify page title is OrangeHRM', async ({ loginPage }) => {
        console.log('\n===== TC03 body running =====');

        await loginPage.getByPlaceholder('Username').fill(USERNAME);
        await loginPage.getByPlaceholder('Password').fill(PASSWORD);
        await loginPage.getByRole('button', { name: 'Login' }).click();

        // Assert browser tab title
        await expect(loginPage).toHaveTitle(/OrangeHRM/, { timeout: 10_000 });

        console.log('✅ TC03 — Page title verified');
    });
});

// ===========================================================
// SECTION B — WORKER FIXTURE  ("loggedInPage")
//
// The browser is launched and login happens ONCE before the
// first test in this worker.  All three tests below SHARE the
// same already-logged-in page.
// The browser closes only after the last test in the worker.
// ===========================================================
test.describe('🟢 WORKER FIXTURE — loggedInPage (shared across all tests)', () => {

    // ── TC04 ────────────────────────────────────────────────
    test('TC04 — Verify Dashboard widgets are present (shared login)', async ({ loggedInPage }) => {
        console.log('\n===== TC04 body running =====');

        // Worker fixture already logged in — navigate to Dashboard
        await loggedInPage.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
        );

        const heading = loggedInPage.getByRole('heading', { name: 'Dashboard' });
        await expect(heading).toBeVisible({ timeout: 10_000 });

        console.log('✅ TC04 — Dashboard verified using shared worker session');
    });

    // ── TC05 ────────────────────────────────────────────────
    test('TC05 — Navigate to My Info page using shared login', async ({ loggedInPage }) => {
        console.log('\n===== TC05 body running =====');

        // No new login needed — worker fixture page is already authenticated
        await loggedInPage.getByRole('link', { name: 'My Info' }).click();
        await loggedInPage.waitForLoadState('domcontentloaded');

        await expect(
            loggedInPage.getByRole('heading', { name: 'Personal Details' })
        ).toBeVisible({ timeout: 8_000 });

        console.log('✅ TC05 — My Info / Personal Details page loaded');
    });

    // ── TC06 ────────────────────────────────────────────────
    test('TC06 — Verify logged-in username in header using shared login', async ({ loggedInPage }) => {
        console.log('\n===== TC06 body running =====');

        // Navigate back to Dashboard first
        await loggedInPage.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
        );

        // Click user-avatar dropdown
        await loggedInPage.locator('.oxd-userdropdown-tab').click();

        const userName = await loggedInPage.locator('.oxd-userdropdown-name').textContent();
        console.log(`   → Logged-in user shown in header: "${userName?.trim()}"`);

        expect(userName?.trim()).toBeTruthy();

        console.log('✅ TC06 — Logged-in username confirmed in header');
    });
});
