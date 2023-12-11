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

function assertEq(test, value) {
    try {
        if (test == value) {
            return new Pass();
        } else {
            return new Fail(`${test} != ${value}`);
        }
    } catch (error) {
        return new Fail(`${error}`);
    }
}

function testBiker(tests) {
    let passes = 0;
    let fails = 0;
    let errors = 0;
    for (test of tests) {
        let result = test;
        let c;
        let msg;
        if (result instanceof Pass) {
            c = passes;
            msg = result.msg;
        } else if (result instanceof Fail) {
            c = fails;
            msg = result.msg;
        } else {
            c = errors;
            msg = "Invalid test";
        }
        c += 1;
        console.log(`  ${msg}`);
    }
    console.log(`${passes}/${tests.length} tests passed.`);
}

module.exports = { Pass, Fail, testBiker, assertEq };
