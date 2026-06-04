# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: June 01\report.spec.ts >> checkbox
- Location: tests\June 01\report.spec.ts:15:5

# Error details

```
Error: expect(locator).toBeChecked() failed

Locator:  locator('[value="sunday"]')
Expected: checked
Received: unchecked
Timeout:  5000ms

Call log:
  - Expect "toBeChecked" with timeout 5000ms
  - waiting for locator('[value="sunday"]')
    14 × locator resolved to <input id="sunday" value="sunday" type="checkbox" class="form-check-input"/>
       - unexpected value "unchecked"

```

```yaml
- checkbox "Sunday"
```

```
Error: page.waitForTimeout: Test ended.
```

# Test source

```ts
  1  | import {expect, test} from '@playwright/test';
  2  | 
  3  | test('radiobutton', async({page}) => {
  4  | 
  5  |     await page.goto('https://testautomationpractice.blogspot.com/')
  6  |     await page.locator('#male').check();
  7  |     await expect(page.locator('#male')).toBeChecked(); //expect(actual). expected condition
  8  |     //await expect(await page.locator('#male').isChecked()).toBeTruthy(); //true
  9  |     await page.waitForTimeout(5000)
  10 |     await expect(page.locator('#female')).not.toBeChecked();
  11 | 
  12 | 
  13 | })
  14 | 
  15 | test('checkbox', async({page})=>{
  16 |     await page.goto('https://testautomationpractice.blogspot.com/')
  17 |     //await page.check('[value="sunday"]') //check the sunday checkbox
  18 |     expect (page.locator('[value="sunday"]')).toBeChecked();
  19 |     await page.waitForTimeout(5000)
  20 |     await page.uncheck('[value="sunday"]')
  21 |     expect (page.locator('[value="monday"]')).not.toBeChecked();
> 22 |     await page.waitForTimeout(5000)
     |                ^ Error: page.waitForTimeout: Test ended.
  23 | })
```