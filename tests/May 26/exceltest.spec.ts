/**
 * Data-Driven Login Test using Excel (.xlsx) with SheetJS
 *
 * Expected Excel structure (./test-data/loginData.xlsx):
 * ┌────────────┬──────────────────────────────┬───────────────────┬────────────┬────────────────┐
 * │ testCaseId │ url                          │ username          │ password   │ expectedResult │
 * ├────────────┼──────────────────────────────┼───────────────────┼────────────┼────────────────┤
 * │ TC_001     │ https://example.com/login    │ admin@example.com │ Admin@123  │ success        │
 * │ TC_002     │ https://example.com/login    │ admin@example.com │ wrongpass  │ failure        │
 * │ TC_003     │ https://example.com/login    │                   │ Admin@123  │ failure        │
 * └────────────┴──────────────────────────────┴───────────────────┴────────────┴────────────────┘
 *
 * Prerequisites:
 *   npm install xlsx
 */

import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import * as path from 'path';

// ---------------------------------------------------------------------------
// TypeScript interface describing each row from the Excel sheet
// ---------------------------------------------------------------------------
interface TestRow {
  testCaseId: string;
  url: string;
  username: string;
  password: string;
  expectedResult: 'success' | 'failure';
}

// ---------------------------------------------------------------------------
// Module-level variable to hold all parsed rows (populated in beforeAll)
// ---------------------------------------------------------------------------
let testRows: TestRow[] = [];

// ---------------------------------------------------------------------------
// beforeAll: read and parse the Excel file once before any test runs
// ---------------------------------------------------------------------------
test.beforeAll(() => {
  // Resolve absolute path to the Excel file
  const filePath = path.resolve(__dirname, '../../test-data/loginData.xlsx');

  // Read the workbook from disk
  const workbook = XLSX.readFile(filePath);

  // Use the first sheet in the workbook
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert sheet to an array of plain objects (row 1 becomes the keys)
  const rawRows = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, {
    defval: '', // treat missing cells as empty strings
  });

  // Map raw objects to strongly-typed TestRow objects
  testRows = rawRows.map((row) => ({
    testCaseId: String(row['testCaseId'] ?? '').trim(),
    url: String(row['url'] ?? '').trim(),
    username: String(row['username'] ?? '').trim(),  // empty string if blank
    password: String(row['password'] ?? '').trim(),  // empty string if blank
    expectedResult: String(row['expectedResult'] ?? '').trim() as TestRow['expectedResult'],
  }));

  console.log(`Loaded ${testRows.length} test row(s) from Excel.`);
});

// ---------------------------------------------------------------------------
// Single test block — iterates over every row with a for...of loop
// ---------------------------------------------------------------------------
test('Data-driven login test from Excel', async ({ page }) => {

  for (const row of testRows) {

    // Step 1 — Log which test case is currently being executed
    console.log(`\n▶ Executing: ${row.testCaseId}`);

    // Step 2 — Navigate to the URL specified in the current row
    await page.goto(row.url);

    // Step 3 — Fill the username input field (empty string is valid per spec)
    await page.locator('#username').fill(row.username);

    // Step 4 — Fill the password input field (empty string is valid per spec)
    await page.locator('#password').fill(row.password);

    // Step 5 — Click the login / submit button
    await page.locator('button[type="submit"]').click();

    // Step 6 — Wait for the page to settle after form submission
    await page.waitForLoadState('networkidle');

    // Step 7 / 8 — Assert the correct outcome based on expectedResult
    if (row.expectedResult === 'success') {
      // Expect the dashboard heading to be visible on a successful login
      await expect(
        page.locator('h1.dashboard-title'),
        `[${row.testCaseId}] Dashboard heading should be visible after successful login`
      ).toBeVisible();

    } else {
      // Expect an error message to be visible on a failed login
      await expect(
        page.locator('.error-message'),
        `[${row.testCaseId}] Error message should be visible after failed login`
      ).toBeVisible();
    }

    // Step 9 — Navigate away / clear state so the next iteration starts fresh
    await page.goto('about:blank');
  }
});
