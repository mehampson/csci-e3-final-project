# csci-e3-final-project

# TestBiker

TestBiker is a simple test runner for JavaScript projects. Why TestBiker? Because I prefer biking to running.

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
function exampleTest() {
    let x = 1 + 1;
    return assertEq(x, 2);
}

function exampleTest2() {
    let x = makeThing();
    return assertInstance(x, Thing);
}

testBiker([exampleTest, exampleTest2]);
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

See the Examples folder for some implementations:

-   basicTesting: A few ways to organize multiple tests in a Node app
-   customTests: Writing custom assertions
-   webpage: How to use TestBiker for testing front-end Javascript
-   json: Getting a JSON object back instead of printing to the console

Most of these can be demoed by navigating to their folder and running `node test`. For the webpage example, serve the site with `http-server` or your alternative of choice, and visit the page in your browser.
