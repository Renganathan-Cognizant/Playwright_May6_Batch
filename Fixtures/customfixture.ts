import { test as basetest} from '@playwright/test';

// Custom type annotations in TS
type Testfixture = {
  testfixture: string;
};

type worker = {
  workerfixture: string;
};

//basetest.extend - Extend playwright test with custom fixture
//fixture 1 - Test level fixture
//worker - worker level fixture

//Test fixture implementation
//{} - dependency fixtures
//use -> function that provides fixture value
//before use() runs before test starts
//control flow : code --> Fixture Setup --> await use() --> Test executes --> control returns
 export const test = basetest.extend<Testfixture,worker>({
  testfixture: async ({}, use) => {
    const testfixture = "Playwright May batch";
    console.log("before executing use statement - Testfixture"); //before test starts
    await use(testfixture); //give this value to the test, execution pauses here until test gets completed
    console.log("after executing use Testfixture"); //after use()
  },

  //worker fixture syntax is array format [fixturefunctions, options]
  workerfixture: [
    async ({}, use) => {
      const workerfixture = "worker fixture"; //creates worker fixture value
      console.log("before executing worker fixture"); //runs before test starts in worker
      await use(workerfixture); // now workerfixture available to tests
      console.log("after executing worker fixture"); //runs after all tests in worker complete
    },
    { scope: 'worker' } //worker fixture always executes once per worker
  ]
});


//1. test fixture - whenever requested test method, it rerun every test
//2.worker fixture : it will run only once per worker
//test fixture




// import {test as basetest} from '@playwright/test';

// //custom type annotations in TS
// //my own created data type
// type fixture1={
//     fixture1:String
// }

// type worker = {
//     workerfixture:any;
// }

// //export const test=

// export const test=basetest.extend<fixture1, worker>({
//     fixture1:async({},use)=>{ //
//         //before use
//         const fixture1 = "Playwright Sep batch"
//         console.log("before executing use statement - fixture 1")
//         //use - will run the test from where fixture is called
//         await use(fixture1) //control goes to spec file
//         //after use
//         console.log("after executing use fixture 1")
//     },

//     workerfixture:[
//         async({},use)=>{
//         //before
//         const workerfixture = "worker fixture"
//         console.log("before executing worker fixture")
//         //use - will run the test from where fixture is called
//         await use(workerfixture)
//         //after
//         console.log("after executing worker fixture"),
//         {scope:"worker"}
//     }]
// })





// ...existing code...

/*
Test Fixture --> created before EACH test & destroyed after EACH test

setup
test 1
teardown

for everytest individually

- they  isolate test
- each test, will get a fresh setup
- independent data
- clean state

------------------------------------------------------------------------------

Worker Fixture --> created ONCE per worker process

if 20 tests runs in a same worker:
- setup only once
- teardown only once

-----> huge performance gain


| Feature                  | Test Fixture                        | Worker Fixture                        |
|--------------------------|-------------------------------------|---------------------------------------|
| Scope                    | Per test                            | Per worker process                    |
| Created                  | Before EACH test                    | Once per worker (before first test)   |
| Destroyed                | After EACH test                     | After ALL tests in worker complete    |
| Isolation                | Full isolation between tests        | Shared across tests in same worker    |
| Performance              | Slower (recreated every test)       | Faster (created only once per worker) |
| State                    | Fresh/clean state for every test    | Shared state across tests             |
| Use Case                 | Login, page setup, test-specific data | DB connections, server setup, auth tokens |
| Syntax                   | async ({}, use) => {}               | [async ({}, use) => {}, { scope: 'worker' }] |
| Data Independence        | Yes, each test gets its own data    | No, all tests share the same data     |
| When to Use              | When tests need isolated environment| When setup is expensive & can be shared|




use() - function that provides fixture value

await use(value)


code BEFORE use():
setup

Code AFTER use():
teardown



Before

"test" contains ---> page, browser, context

"After" contains --> page, browser, context, testfixture, workerfixture


*/






