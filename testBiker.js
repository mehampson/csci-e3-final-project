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

function testBiker(tests) {
    /* console.log supports CSS, but I imagine using this in a terminal,
     * rather than a browser, so we'll use ANSI color codes instead. */
    const passColor = "\u001b[32m";
    const failColor = "\u001b[31m ";
    const errorColor = "\u001b[35m";
    const resetColor = "\u001b[0m";

    let passes = 0;
    for (test of tests) {
        let result = test();
        let c;
        let msg;
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
        console.log(`  ${test.name}: ${color}${msg}${resetColor}`);
    }
    console.log(
        `${passes == tests.length ? "Success" : "Uh-oh"}: ${passes}/${
            tests.length
        } tests passed.`
    );
}

/* This is our core assertion test. We just check if `test` is true or not,
 * and return a Pass or Fail object*/

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

function assertEq(test, value) {
    return assert(test == value, `${test} != ${value}`);
}

function assertNotEq(test, value) {
    return assert(test != value, `${test} == ${value}`);
}

function assertGT(test, value) {
    return assert(test > value, `${test} <= ${value}`);
}

function assertGTE(test, value) {
    return assert(test >= value, `${test} < ${value}`);
}

function assertLT(test, value) {
    return assert(test < value, `${test} >= ${value}`);
}

function assertLTE(test, value) {
    return assert(test <= value, `${test} > ${value}`);
}

function assertNaN(test) {
    return assert(isNaN(test), `${test} is a number`);
}

function assertException(test) {
    return;
}

function assertIsInstance(test, value) {
    return assert(
        test instanceof value,
        `${test} is not an instance of ${value}`
    );
}

module.exports = {
    Pass,
    Fail,
    testBiker,
    assert,
    assertEq,
    assertNotEq,
    assertException,
    assertGT,
    assertGTE,
    assertLT,
    assertLTE,
    assertNaN,
    assertNotEq,
};
