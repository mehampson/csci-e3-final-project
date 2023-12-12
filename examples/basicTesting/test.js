import { tests } from "./index.js";
import { assertEq, testBiker } from "../../testBiker.mjs";

/* Your test file is where you prepare your tests. You can write them here,
 * or you can import them from other locations in your project.
 * Just be sure to combine all your test arrays and send it to testBiker. */

function singleTest() {
    return assertEq(1, 1);
}

tests.push(singleTest);

/* Send an array of tests to testBiker */
testBiker(tests);
