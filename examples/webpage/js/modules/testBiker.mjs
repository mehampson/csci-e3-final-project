class Pass {
    constructor() {
        this.msg = "Pass";
    }
}

class Fail {
    constructor(msg) {
        this.msg = `Fail: ${msg}`;
    }
}

class ColorFormat {
    constructor(pass, fail, error, reset) {
        this.pass = pass;
        this.fail = fail;
        this.error = error;
        this.reset = reset;
    }
}

const ColorANSI = new ColorFormat(
    "\u001b[32m",
    "\u001b[31m",
    "\u001b[35m",
    "\u001b[0m"
);

const ColorCSS = new ColorFormat(
    "rgb(0,170,0)",
    "rgb(170,0,0)",
    "rgb(170,0,170",
    "initial"
);

function testBiker(tests, renderer = "console") {
    /* Takes an array of test functions and calls each one.
     * The test functions should each return the value of an assertion
     * function, like those below, for this to work as expected.
     * (i.e., a Pass or Fail object.)
     *
     * The 'renderer' parameter controls the output behavior of this function.
     * There are three options:
     *   console: print to an ANSI-compatible terminal (includes Chromium-based browsers)
     *   css: print to a CSS-compatible terminal (specifically, you'll need this in Firefox)
     *   json: return the results as a JSON string instead of printing to the console */

    let results = [];

    /* First we run through the tests and perform them. We add the function name to the
     * results but nothing else at this point */
    for (let test of tests) {
        let r = test();
        r.name = test.name;
        results.push(r);
    }

    // Now we do something with the results. JSON, or the console?
    if (renderer == "json") {
        return JSON.stringify(results);
    } else {
        // Which of our defined ColorFormat instances we need to use?
        let colors = renderer == "css" ? ColorCSS : ColorANSI;

        // Counter for how many tests pass
        let passes = 0;

        for (let result of results) {
            let msg, color;
            if (result instanceof Pass) {
                passes += 1;
                msg = result.msg;
                color = colors.pass;
            } else if (result instanceof Fail) {
                msg = result.msg;
                color = colors.fail;
            } else {
                /* If the test function can't give us a Pass or Fail object,
                 * it probably wasn't set up correctly to begin with. */
                msg = "Invalid test";
                color = colors.error;
            }
            /* Browser terminals can generally parse CSS embedded in the console messages.
             * We use the %c operator to do that. */
            if (renderer == "css") {
                console.log(
                    `  ${result.name}: %c${msg}%c`,
                    `color:${color}`,
                    `color:${colors.reset}`
                );
            } else {
                /* This is our default case: the classic ANSI format */
                console.log(`  ${result.name}: ${color}${msg}${colors.reset}`);
            }
        }
        console.log(
            `${passes == results.length ? "Success" : "Uh-oh"}: ${passes}/${
                results.length
            } tests passed.`
        );
    }
}

/* *** Assertions *** */

/* For our purposes, a usable assertion is any function/expression that can
 * check if some test is true, and returns a Pass or Fail object.
 * This is our core assert function. Most of our assertions use this, but not all. */

function assert(test, failMsg) {
    try {
        if (test) {
            return new Pass();
        } else {
            return new Fail(`${failMsg}`);
        }
    } catch (error) {
        // In case something goes really wrong with the test
        return new Fail(`${error}`);
    }
}

/* Most of these delivered assertions are really simple, and their value is in the ergonomics */

// Equality test
function assertEq(test, value) {
    return assert(test == value, `${test} != ${value}`);
}

// Inequality test
function assertNotEq(test, value) {
    return assert(test != value, `${test} == ${value}`);
}

// Test something is NaN
function assertNaN(test) {
    return assert(isNaN(test), `${test} is a number`);
}

// Test that a value is not infinite
function assertFinite(test) {
    return assert(Number.isFinite(test), `${test} is infinite`);
}

// Test that a value is infinite
function assertInfinite(test) {
    return assert(!Number.isFinite(test), `${test} is finite`);
}

// Test that a callable function will raise an exception.
// Write these tests as: assertException( () => { bad_behavior() } )
function assertException(test) {
    /* This is counterintuitive: we're testing something that needs to
     * throw an error in certain conditions. If the test function
     * returns anything in those conditions, the test has failed.  */
    if (typeof test === "function") {
        try {
            test();
            return new Fail(`${test} did not raise an Exception`);
        } catch (error) {
            return new Pass();
        }
    } else {
        return new Fail(`${test} is not callable`);
    }
}

// Test that a value will be an instance of something
function assertInstance(test, value) {
    return assert(
        test instanceof value,
        `${test} is not an instance of ${value}`
    );
}

function assertType(test, value) {
    return assert(typeof test == value, `${test} is not a ${value}`);
}

function assertNotNull(test) {
    return assert(test !== null, `${test} is null`);
}

function assertNull(test) {
    return assert(test === null, `${test} is not null`);
}

/* Example of what DOM-based assertions might look like
 * When writing DOM tests, bear in mind that 'this' might not
 * be in context for the testBiker function, but you can bind
 * it to the test. See the webpage example. */

function assertChildOf(test, parent) {
    if (parent.children === undefined) {
        return new Fail(`${parent} has no children`);
    } else {
        for (let child of parent.children) {
            if (child === test) {
                return new Pass();
            }
        }
        return new Fail(`${test} is not a child of ${parent}`);
    }
}

function assertNoChildren(test) {
    return assert(test.children.length == 0, `${test} has children`);
}

export {
    Pass,
    Fail,
    testBiker,
    assert,
    assertEq,
    assertNotEq,
    assertException,
    assertNaN,
    assertInstance,
    assertFinite,
    assertInfinite,
    assertType,
    assertNotNull,
    assertNull,
    assertChildOf,
    assertNoChildren,
};
