import { test, expect } from '@playwright/test';

// ============================================================
// WHAT IS ASSERTION?
// An assertion is a check/verification that confirms whether
// something on the page is TRUE or matches what we EXPECT.
// If the assertion FAILS → test is marked as FAILED ❌
// If the assertion PASSES → test continues or is marked PASSED ✅
// ============================================================

// ============================================================
// ASSERTION SYNTAX:
//   expect(locator/value).matcherFunction()
//
//   expect  → Playwright's built-in assertion function
//   (locator/value) → what you want to check
//   .matcherFunction() → what condition you are verifying
//
// Example:
//   await expect(page).toHaveTitle("OrangeHRM");
//          ↑             ↑              ↑
//        expect      what to check   condition
// ============================================================


// ============================================================
// HARD ASSERTION (default behavior)
// - If a hard assertion FAILS, the test STOPS immediately.
// - Remaining steps after the failure are NOT executed.
// - Use: await expect(locator).matcher()
// ============================================================

test('Hard Assertion Demo', async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // ✅ HARD ASSERTION 1: Check the page title
    // If title doesn't match → test stops here, nothing below runs
    await expect(page).toHaveTitle("OrangeHRM");
    console.log("✅ Page title is correct");

    // ✅ HARD ASSERTION 2: Check the page URL contains 'login'
    await expect(page).toHaveURL(/login/);
    console.log("✅ URL contains 'login'");

    // ✅ HARD ASSERTION 3: Check username field is visible
    const usernameField = page.getByPlaceholder("");
    await expect(usernameField).toBeVisible();
    console.log("✅ Username field is visible");

    // ✅ HARD ASSERTION 4: Check password field is visible
    const passwordField = page.getByPlaceholder("Password");
    await expect(passwordField).toBeVisible();
    console.log("✅ Password field is visible");

    // ✅ HARD ASSERTION 5: Check Login button is visible and enabled
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    console.log("✅ Login button is visible and enabled");

});


// ============================================================
// SOFT ASSERTION
// - If a soft assertion FAILS, the test does NOT stop.
// - It records the failure and CONTINUES running remaining steps.
// - At the end, if any soft assertion failed → test is marked FAILED.
// - Use: expect.soft(locator).matcher()
// ============================================================

test('Soft Assertion Demo', async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // 🟡 SOFT ASSERTION 1: Check page title (will pass)
    await expect.soft(page).toHaveTitle("OrangeHRM");
    console.log("Checked page title (soft)");

    // 🟡 SOFT ASSERTION 2: Intentionally WRONG title to show soft assertion behavior
    // This will FAIL but the test will CONTINUE running the next steps
    await expect.soft(page).toHaveTitle("Wrong Title - This will fail but test continues");
    console.log("Checked wrong title (soft) → failed but test still runs ✅");

    // 🟡 SOFT ASSERTION 3: Check the OrangeHRM logo is visible (will pass)
    const logo = page.locator("//img[@alt='company-branding']");
    await expect.soft(logo).toBeVisible();
    console.log("Checked logo visibility (soft)");

    // Even though SOFT ASSERTION 2 failed above,
    // this line still runs because soft assertions don't stop the test
    console.log("✅ Test reached the end despite a soft assertion failure");

});


// ============================================================
// MOST IMPORTANT ASSERTION EXAMPLES
// All the commonly used Playwright assertions demonstrated
// on the OrangeHRM login page
// ============================================================

test('Important Assertion Examples', async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // ----------------------------------------------------------
    // 1. toHaveTitle → checks the browser tab title
    // ----------------------------------------------------------
    await expect(page).toHaveTitle("OrangeHRM");
    console.log("1toHaveTitle ✅");

    // ----------------------------------------------------------
    // 2. toHaveURL → checks the current page URL
    // ----------------------------------------------------------
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    console.log("2toHaveURL ✅");

    // ----------------------------------------------------------
    // 3. toBeVisible → checks element is visible on the screen
    // ----------------------------------------------------------
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    console.log("3toBeVisible ✅");

    // ----------------------------------------------------------
    // 4. toBeEnabled → checks element is not disabled
    // ----------------------------------------------------------
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    console.log("4toBeEnabled ✅");

    // ----------------------------------------------------------
    // 5. toBeEmpty → checks input field has no text
    // ----------------------------------------------------------
    await expect(page.getByPlaceholder("Username")).toBeEmpty();
    console.log("5toBeEmpty ✅ (field is empty before typing)");

    // ----------------------------------------------------------
    // 6. toHaveValue → checks the current value inside an input field
    // ----------------------------------------------------------
    await page.getByPlaceholder("Username").fill("Admin");
    await expect(page.getByPlaceholder("Username")).toHaveValue("Admin");
    console.log("6toHaveValue ✅");

    // ----------------------------------------------------------
    // 7. toHaveText → checks the visible text content of an element
    // ----------------------------------------------------------
    await expect(page.getByRole('button', { name: 'Login' })).toHaveText("Login");
    console.log("7️⃣  toHaveText ✅");

    // ----------------------------------------------------------
    // 8. toContainText → checks element contains part of the text
    // ----------------------------------------------------------
    // Checking the page heading contains "Login" (partial match)
    await expect(page.locator("//h5")).toContainText("Login");
    console.log("8️⃣  toContainText ✅");

    // ----------------------------------------------------------
    // 9. toHaveAttribute → checks an HTML attribute of an element
    // ----------------------------------------------------------
    // Checking the username input has attribute name="username"
    await expect(page.locator('[name="username"]')).toHaveAttribute("name", "username");
    console.log("9️⃣  toHaveAttribute ✅");

    // ----------------------------------------------------------
    // 10. NOT assertion → reverses/negates the condition
    //     Use .not. before the matcher to assert the OPPOSITE
    // ----------------------------------------------------------
    // Check that error message is NOT visible before submitting
    await expect(page.locator(".oxd-alert-content")).not.toBeVisible();
    console.log("🔟  NOT assertion ✅ (error message is not visible yet)");

    // ----------------------------------------------------------
    // 11. Assertion after login → checking navigation happened
    // ----------------------------------------------------------
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for dashboard to load and check URL changed
    await expect(page).toHaveURL(/dashboard/);
    console.log("1️⃣1️⃣  toHaveURL after login ✅ (navigated to dashboard)");

    // Check Dashboard heading is visible after login
    await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible();
    console.log("1️⃣2️⃣  Dashboard heading is visible ✅");

});
