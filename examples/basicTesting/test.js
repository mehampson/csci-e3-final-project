import { tests } from "./index.js";
import { assertEq, testBiker } from "../../testBiker.js";

/* Tests can be imported from your project, or defined in your test file */
function localTest() {
    return assertEq(1, 1);
}

tests.push(localTest);

/* Just send an array of tests to testBiker */
testBiker(tests);
