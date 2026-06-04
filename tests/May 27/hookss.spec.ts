import{test} from '@playwright/test';

test.beforeAll('Before all test',async()=>{
    
    console.log("------------------Before all test-----------------")
})

test.beforeEach("Before each test",async()=>{
    console.log("------------------Before each test-----------------")
})

test.describe("describe",async()=>{
    test.beforeAll("beforeall inside describe",async()=>{
        console.log("$$$$$$$$$$$$$$$ Before ALL inside Describe $$$$$$$$$$$$$$$")
    })

    test.beforeEach("before each inside describe",async()=>{
        console.log("$$$$$$$$$$$$$$$ Before EACH inside Describe $$$$$$$$$$$$$$$")
     
    })

    test("test 1 inside describe block", async()=>{
        console.log("$$$$$$$$$$$$$$$ TEST 1 inside Describe test $$$$$$$$$$$$$$$")
      
    })

    test("test 2 inside describe block", async()=>{
        console.log("$$$$$$$$$$$$$$$ TEST 2 inside Describe $$$$$$$$$$$$$$$")
        
    })

    test.afterEach("After Each inside describe",async()=>{
        console.log("$$$$$$$$$$$$$$$ After Each inside Describe $$$$$$$$$$$$$$$")
        

    test.afterAll("After all inside describe",async()=>{
        console.log("$$$$$$$$$$$$$$$ After All inside Describe $$$$$$$$$$$$$$$")
    })
})


test.afterEach("After Each Test",async()=>{
    console.log("------------------After each test-----------------")
})

test.afterAll("After all test",async()=>{
    console.log("------------------After All test-----------------")
   
})
})