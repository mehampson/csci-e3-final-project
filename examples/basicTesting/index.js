import {
    assertEq,
    assertException,
    assertInfinite,
    assertNotEq,
    assertNaN,
    assertInstance,
    assertFinite,
    assertType,
} from "../../testBiker.js";

/* Let's reimplement some basic arithmetic in this example code, just to give us something to test. */

function adder(x, y) {
    if (y >= 0) {
        while (y) {
            x++;
            y--;
        }
    } else {
        while (y < 0) {
            x--;
            y++;
        }
    }
    return x;
}

function subtracter(x, y) {
    return adder(x, y * -1);
}

function multiplier(x, y) {
    /* We'll need to remember if x or y were negative */
    let negative_x = x > 0;
    let negative_y = y > 0;

    let result = 0;

    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        result = adder(result, x);
        y = subtracter(y, 1);
    }

    // Obviously a bitwise XOR is the best way to tell if our result should be a negative number
    if (negative_x ^ negative_y) {
        result = result * -1;
    }
    return result;
}

function divider(x, y) {
    if (y == 0) {
        return Infinity;
    } else {
        // There may be edge cases where this logic does not work -- need to investigate further
        return 7;
    }
}

function makeArray(x) {
    if (x < 0) {
        throw new Error("Arrays can't be negative in size!");
    } else {
        return new Array(x);
    }
}

let tests = [
    // Test that we get the values we should
    function testAdder() {
        return assertEq(adder(5, 7), 12);
    },

    function testSubtractor() {
        return assertType(subtracter(5, 7), "number");
    },

    // Test that we *don't* get a value that would indicate a bug
    function testMulitplier() {
        return assertNotEq(multiplier(3, -4), 12);
    },

    function testDivider() {
        return assertEq(divider(10, 5), 2);
    },

    function testDivideByZero() {
        return assertInfinite(divider(14, 0));
    },

    function testNaN() {
        return assertNaN(makeArray(5));
    },

    function testInstance() {
        return assertInstance(makeArray(5), Array);
    },

    // We can write tests for cases that *should* throw errors
    function testExceptions() {
        return assertException(() => makeArray(-5));
    },
];

export { tests };
