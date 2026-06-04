import{test} from '@playwright/test';


test.beforeAll('Before all test',async()=>{
    console.log("------------------Before all test-----------------")
})

test.beforeEach("Before each test",async()=>{
    console.log("------------------Before each test-----------------")
})

test("Test 1", async()=>{
    console.log("------------------ Executing Test 1 -----------------")
})

test("Test 2",async()=>{
    console.log("------------------ Executing Test 2 -----------------")
})

test.afterEach("After Each Test",async()=>{
    console.log("------------------After each test-----------------")
})

test.afterAll("After all test",async()=>{
    console.log("------------------After All test-----------------")
})