import { Recipe, getRecipeFromAPI } from "./index.js";
import { assert, testBiker } from "../../testBiker.js";

/* Custom tests can be written */

// Mock the payload of an API response
function mockRecipeApi() {
    return '{"name":"Grilled Cheese","ingredients":["two slices of bread","two slices of American cheese","butter"],"steps":["1. Make a cheese sandwich","2. Grill it"]}';
}

/* Our custom test. We do our business, then return an assertion about it.
 * We actually do have assertIsInstance, but this is how we'd test for it if we didn't. */
function testCustom() {
    let json = mockRecipeApi();
    let newRecipe = getRecipeFromAPI(json);
    return assert(newRecipe instanceof Recipe, "Not a valid recipe");
}

/* Send an array of tests to testBiker */
testBiker([testCustom]);
