import { getRecipeFromAPI } from "./index.js";
import { assertEq, assertNotNull, testBiker } from "../../testBiker.mjs";

/* Custom tests can be written */

// Mock the payload of an API response
function mockRecipeApi() {
    return '{"name":"Grilled Cheese","ingredients":["two slices of bread","two slices of American cheese","butter"],"steps":["1. Make a cheese sandwich","2. Grill it"]}';
}

/* Our custom test. We do our business, then return an assertion about it.
 * We actually do have assertIsInstance, but this is how we'd write a custom
 * test for it if we didn't. */
function testJson() {
    let json = mockRecipeApi();
    let newRecipe = getRecipeFromAPI(json);
    return assertNotNull(newRecipe);
}

function testJsonFailure() {
    let json = mockRecipeApi();
    let newRecipe = getRecipeFromAPI(json);
    return assertEq(newRecipe, 6);
}

/* Send an array of tests to testBiker, and get the results as a JSON string */
let results = testBiker([testJson, testJsonFailure], "json");

console.log(JSON.parse(results));
