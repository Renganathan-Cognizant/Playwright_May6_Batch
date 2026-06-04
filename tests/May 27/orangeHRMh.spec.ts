import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';

// ============================================================
// Playwright Hooks — OrangeHRM Login Example
//
// Hook execution order for EACH test:
//
//   beforeAll  (runs once before the whole suite)
//     └─► beforeEach  (runs before every individual test)
//           └─► test body
//         afterEach   (runs after every individual test)
//   afterAll   (runs once after the whole suite)
//
// URL  : https://opensource-demo.orangehrmlive.com/
// Creds: Admin / admin123
// ============================================================

// ── Shared state (initialised in beforeAll) ─────────────────
let browser: Browser;
let context: BrowserContext;
let page: Page;

// ── Constants ───────────────────────────────────────────────
const BASE_URL  = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const USERNAME  = 'Admin';
const PASSWORD  = 'admin123';

// ===========================================================
// beforeAll — runs ONCE before the entire describe block
// Use it for expensive one-time setup: launching the browser,
// creating a context, opening the first tab.
// ===========================================================
test.beforeAll('Launch browser and create context', async () => {
    console.log('\n========== beforeAll: Launching browser ==========');

    browser = await chromium.launch({ headless: false, slowMo: 50 });
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
    });
    page = await context.newPage();

    console.log('✅ Browser launched, context and page created.');
});

// ===========================================================
// beforeEach — runs before EVERY test
// Use it for actions that must happen fresh for each test:
// navigating to the login page and logging in.
// ===========================================================
test.beforeEach('🔑 Navigate and log in to OrangeHRM', async () => {
    console.log('\n---------- beforeEach: Navigating to login page ----------');

    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Fill credentials
    await page.getByPlaceholder('Username').fill(USERNAME);
    await page.getByPlaceholder('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait until the dashboard is visible — confirms login succeeded
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    console.log('✅ Logged in successfully — Dashboard visible.');
});

// ===========================================================
// TEST 1 — Verify Dashboard heading after login
// ===========================================================
test('TC01 — Dashboard heading is visible after login', async () => {
    console.log('\n========== TEST 1: Verify Dashboard heading ==========');

    const heading = page.getByRole('heading', { name: 'Dashboard' });
    await expect(heading).toBeVisible();

    console.log('✅ TC01 passed — Dashboard heading confirmed.');
});

// ===========================================================
// TEST 2 — Verify logged-in username in the top-right menu
// ===========================================================
test('TC02 — Logged-in user name is displayed in header', async () => {
    console.log('\n========== TEST 2: Verify logged-in user name ==========');

    // Click the user-avatar/dropdown in the top-right corner
    await page.locator('.oxd-userdropdown-tab').click();

    // The dropdown shows the user's name
    const userNameText = await page.locator('.oxd-userdropdown-name').textContent();
    console.log(`   → Logged-in user: ${userNameText?.trim()}`);

    expect(userNameText?.trim()).toBeTruthy();

    console.log('✅ TC02 passed — Username found in header.');
});

// ===========================================================
// TEST 3 — Navigate to "My Info" page from the sidebar
// ===========================================================
test('TC03 — Navigate to My Info page', async () => {
    console.log('\n========== TEST 3: Navigate to My Info ==========');

    // Click "My Info" in the left navigation menu
    await page.getByRole('link', { name: 'My Info' }).click();
    await page.waitForLoadState('domcontentloaded');

    // The page heading should contain "Personal Details"
    await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible({ timeout: 8_000 });

    console.log('✅ TC03 passed — My Info / Personal Details page loaded.');
});

// ===========================================================
// afterEach — runs after EVERY test
// Use it for cleanup that must happen after each test:
// logging out so the next test always starts from the login page.
// ===========================================================
test.afterEach('🔓 Log out after each test', async () => {
    console.log('\n---------- afterEach: Logging out ----------');

    // Open the user dropdown
    await page.locator('.oxd-userdropdown-tab').click();

    // Click "Logout"
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // Confirm we are back on the login page
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: 8000 });

    console.log('✅ Logged out — back on login page.');
});

// ===========================================================
// afterAll — runs ONCE after all tests in the suite finish
// Use it to release resources: close the browser.
// ===========================================================
test.afterAll('🛑 Close browser', async () => {
    console.log('\n========== afterAll: Closing browser ==========');

    await context.close();
    await browser.close();

    console.log('✅ Browser closed — suite complete.');
});
