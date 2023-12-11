import { assertEq } from "../testBiker.js";

/* This is bound to be better than the built-in arithmetic operators! */

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

function multiplier(x, y) {}

function divider(x, y) {}

let tests = [assertEq(adder(5, 7), 12), assertEq(subtracter(5, 7), -2)];

export { tests };
