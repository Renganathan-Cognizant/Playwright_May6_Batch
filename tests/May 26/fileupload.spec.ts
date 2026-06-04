import{test} from '@playwright/test';

test('file upload', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    
    await page.evaluate(()=>{
        window.scrollBy(0,1600)
    })

    await page.waitForTimeout(5000);
    await page.setInputFiles("#singleFileInput","./tests/FilesToUpload/testFile.txt")
    await page.waitForTimeout(5000);
})

//to upload multiple files
test('multi file upload', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.evaluate(()=>{
        window.scrollBy(0,1600)
    })
    await page.waitForTimeout(3000)
    await page.setInputFiles("#multipleFilesInput",["./tests/FilesToUpload/testFile.txt","./tests/FilesToUpload/testDoc.txt"])
    await page.waitForTimeout(5000)

    //to remove files
    await page.setInputFiles("#multipleFilesInput",[])
    await page.waitForTimeout(5000);
})

//file upload using event handlers
test('multi file upload - event handlers', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.evaluate(()=>{
        window.scrollBy(0,1600)
    })

    const uploadFile = page.waitForEvent('filechooser')
    await page.locator('#multipleFilesInput').click()
    const upload = await uploadFile
    
    await page.waitForTimeout(5000);
    upload.setFiles(["./tests/FilesToUpload/testDoc.txt","./tests/FilesToUpload/testFile.txt"])
    await page.waitForTimeout(5000);
})