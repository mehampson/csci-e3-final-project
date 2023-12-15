/* *** Assertions *** */

/* For our purposes, a usable assertion is any function/expression that can
 * check if some test is true, and returns a Pass or Fail object. */

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

/* This is our core assert function. Most of our assertions use this, but not all. */
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

/* Most of these delivered assertions are really simple. The value of these is just in being a little friendlier to type. */

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

/* Example of what DOM-based assertions might look like.
 * When testing in the DOM, bear in mind that 'this' might not be in context for the testBiker function,
 * but you can bind it to the test. See the webpage example. */

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
