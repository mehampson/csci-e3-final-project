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

function testBiker(tests, renderer = "console") {
    /* We might output to twoconsole.log supports CSS, but I imagine using this in a terminal,
     * rather than a browser, so we'll use ANSI color codes instead. */

    let results = [];

    for (let test of tests) {
        let r = test();
        r.name = test.name;
        results.push(r);
    }

    if (renderer == "json") {
        return JSON.stringify(results);
    } else if (renderer == "css") {
        renderCSS(results);
    } else {
        renderANSI(results);
    }
}

function renderANSI(results) {
    const passColor = "\u001b[32m";
    const failColor = "\u001b[31m";
    const errorColor = "\u001b[35m";
    const resetColor = "\u001b[0m";
    let passes = 0;

    for (let result of results) {
        let c, msg, color;
        if (result instanceof Pass) {
            passes += 1;
            msg = result.msg;
            color = passColor;
        } else if (result instanceof Fail) {
            msg = result.msg;
            color = failColor;
        } else {
            msg = "Invalid test";
            color = errorColor;
        }
        c += 1;
        console.log(`  ${result.name}: ${color}${msg}${resetColor}`);
    }
    console.log(
        `${passes == results.length ? "Success" : "Uh-oh"}: ${passes}/${
            results.length
        } tests passed.`
    );
}

function renderCSS(results) {
    const passColor = "rgb(0,170,0)";
    const failColor = "rgb(170,0,0)";
    const errorColor = "rgb(170,0,170";
    let passes = 0;

    for (let result of results) {
        let c, msg, color;
        if (result instanceof Pass) {
            passes += 1;
            msg = result.msg;
            color = passColor;
        } else if (result instanceof Fail) {
            msg = result.msg;
            color = failColor;
        } else {
            msg = "Invalid test";
            color = errorColor;
        }
        c += 1;
        console.log(
            `  ${result.name}: %c${msg}%c`,
            `color:${color}`,
            `color:default`
        );
    }
    console.log(
        `${passes == results.length ? "Success" : "Uh-oh"}: ${passes}/${
            results.length
        } tests passed.`
    );
}

/* *** Assertions *** */

/* This is our core assertion test. We just check if `test` is true or not,
 * and return a Pass or Fail object. Most of our assertions use this, but not all. */

function assert(test, failMsg) {
    try {
        if (test) {
            return new Pass();
        } else {
            return new Fail(`${failMsg}`);
        }
    } catch (error) {
        return new Fail(`${error}`);
    }
}

// Equality test
function assertEq(test, value) {
    return assert(test == value, `${test} != ${value}`);
}

// Inequality test
function assertNotEq(test, value) {
    return assert(test != value, `${test} == ${value}`);
}

// Test for NaN
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
// Write these tests as: assertException( () => {bad_behavior()} )
function assertException(test) {
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
};
