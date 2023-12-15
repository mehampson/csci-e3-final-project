# csci-e3-final-project

# TestBiker

TestBiker is a simple test runner for JavaScript projects. 

Why write TestBiker for my CSCI E-3 final project? Because unit testing is neat and I've been thinking about how I would want it to work in JavaScript. I've used other JS frameworks a little bit, mainly Jest -- I know I'm reinventing the wheel and mine's not entirely round yet. (Side note: some of the techniques we're required to use for our project are in the examples, especially `webpage`, rather than the main testBiker code. I hope that's still in the spirit of things.)

Why call it TestBiker? Because I prefer biking to running.

## Features

TestBiker is fairly framework-agnostic. If you can import the module, you can probably use it. Your test results can displayed in a console window or returned as a JSON string for consumption elsewhere. TestBiker offers many types of test assertions:

-   Equals something (assertEq)
-   Does not equal something (assertNotEq)
-   Raises an exception (assertException)
-   Not a number (assertNaN)
-   Is an instance of a class (assertInstance)
-   Is a particular type (assertType)
-   Is Infinity (assertInfinite)
-   Is not Infinity (assertFinite)
-   Is not null (assertNotNull)
-   Is null (assertNull)
-   Is a child of (assertChildOf)
-   Has no child (assertNoChildren)

Is it as fully-featured as Jest, Mocha, or any other test runner out there? No, this is just a homework project! Should you use it anyway? Umm... yes.

## Usage

Write each unit test as a named function that returns a specific assertion. Then pass an array with all of your test functions to the testBiker() runner function: TestBiker will run all your tests and show you the outcomes.

`testBiker(Function[] tests, String:'console'|'css'|'json' renderer)`

```javascript
let tests = [
  function exampleTest() {
      let x = 1 + 1;
      return assertEq(x, 2);
  },

  function exampleTest2() {
      let x = makeThing();
      return assertInstance(x, Thing);
  }
];

testBiker(tests);
```

```
$ node test
  exampleTest: Pass
  exampleTest2: Pass
Success: 2/2 tests passed.
```

You can do this in a test script and run it from the command line, trigger with an event listener in a front end script, or capture the results as JSON and work with them programatically.

## Custom Tests

TestBiker lets you write your own assertions, if none of the prebuilt ones work. Just use the base `assert` function and provide a failure message

```javascript
function customAssertion(test) {
    return assert(test.length == 9, `${test} is not 9 characters long`);
}

let tests = [
    function customTest() {
        let x = "TestBiker";
        return customAssertion(x);
    },

    function customTest2() {
        let x = "SomethingElse";
        return customAssertion(x);
    },
];

testBiker(tests);
```

```
$ node test
  customTest: Pass
  customTest2: Fail: SomethingElse is not 9 characters long
Uh-oh: 1/2 tests passed.
```

## Examples

See the Examples folder for some how to use TestBiker:

-   basicTesting: A few ways to organize multiple tests in a Node app
-   customTests: Writing custom assertions
-   webpage: How to use TestBiker for testing front-end Javascript, by listening for a custom event
-   json: Getting a JSON object back instead of printing to the console

Most of these can be demoed by navigating to their folder and running `node test`. For the webpage example, serve the site with `http-server` or your alternative of choice, and visit the page in your browser.
