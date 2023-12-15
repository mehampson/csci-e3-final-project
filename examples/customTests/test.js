import { Recipe, getRecipeFromAPI } from "./index.js";
import { assert, testBiker } from "../../main.js";

/* Custom tests can be written. We just do our business, then return an assertion about it.
 * We actually do have assertIsInstance, but this is how we'd write a custom
 * test for it if we didn't.
 *
 * Here we're using a one-off custom assertion, but you define your own reusable ones.
 * See the Readme for an example. */
function testCustom() {
    // Mock the payload of an API response
    let json =
        '{"name":"Grilled Cheese","ingredients":["two slices of bread","two slices of American cheese","butter"],"steps":["1. Make a cheese sandwich","2. Grill it"]}';
    let newRecipe = getRecipeFromAPI(json);
    return assert(newRecipe instanceof Recipe, "Not a valid recipe");
}

testBiker([testCustom]);
