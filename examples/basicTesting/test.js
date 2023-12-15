import { tests } from "./index.js";
import { assertEq, testBiker } from "../../main.js";

/* In a Node app, you can create a test file and configure it in package.json.
 * You can write the tests directly in the test file, or import them from other locations
 * in your project -- whichever makes more sense in your situation.
 * Just be sure to combine all your test arrays and send it to testBiker. */

// We already brought in our tests from index.js, but here's another one
function singleTest() {
    return assertEq(1, 1);
}

// Just smoosh them together
tests.push(singleTest);

// And send them off to TestBiker
testBiker(tests);
