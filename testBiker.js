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
    let passes = 0;
    let fails = 0;
    let errors = 0;
    for (test of tests) {
        let result = test();
        let c;
        let msg;
        if (result instanceof Pass) {
            passes += 1;
            msg = result.msg;
        } else if (result instanceof Fail) {
            fails += 1;
            msg = result.msg;
        } else {
            errors += 1;
            msg = "Invalid test";
        }
        c += 1;
        console.log(`  ${test.name}: ${msg}`);
    }
    console.log(`${passes}/${tests.length} tests passed.`);
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

module.exports = {
    Pass,
    Fail,
    testBiker,
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
