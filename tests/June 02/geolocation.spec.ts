// E-commerce: Validate region-specific pricing, currency, and promotions.

// Content delivery: Ensure localized news or media is shown correctly.

// Navigation apps: Test map rendering and route suggestions based on user location.

// Booking platforms: Check availability and recommendations based on proximity.

// Geo-restrictions: Confirm access is blocked or redirected in restricted regions.


import {chromium, test} from '@playwright/test';

test('geolocation', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext({
        geolocation: {
            latitude: 31.264231,
            longitude: -98.671841
        },
        permissions:['geolocation'] //this permission is important
    })
    const page = await context.newPage()
    await page.goto("https://www.gmail.com")
    await page.waitForTimeout(10000)
    await browser.close();
})

test("without geolocation", async({page})=>{
    await page.goto ("https://www.amazon.in")
    await page.waitForTimeout(10000)
})

test.only('Set geolocation and verify location-based content', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    geolocation: { latitude: 48.8566, longitude: 2.3522 }, // Paris, France
    permissions: ['geolocation']
  });

  const page = await context.newPage();
  await page.goto('https://www.openstreetmap.org');

  // Interact with the map or location-based feature
  await page.locator('(//*[@class="control-button control-button-last"])[1]').click();
  await page.waitForTimeout(20000);

  // Optionally verify map center or location marker
  const url = page.url();
  console.log('Current map URL:', url);

  await browser.close();
});