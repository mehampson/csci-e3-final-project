import { assertEq } from "../testBiker.js";

/* Let's reimplement some basic arithmetic in this example code. */

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

    // Obviously a bitwise XOR is the best way to tell if we need to convert back to a negative number
    if (negative_x ^ negative_y) {
        result = result * -1;
    }
    return result;
}

function divider(x, y) {
    if (y == 0) {
        return NaN;
    } else {
        // This might need some work?
        return 7;
    }
}

let tests = [
    function testAdder() {
        return assertEq(adder(5, 7), 12);
    },

    function testSubtractor() {
        return assertEq(subtracter(5, 7), -2);
    },

    function testMulitplier() {
        return assertEq(multiplier(3, -4), -12);
    },
];

export { tests };
