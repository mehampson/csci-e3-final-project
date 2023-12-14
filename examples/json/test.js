import { getRecipeFromAPI } from "./index.js";
import { assertEq, assertNotNull, testBiker } from "../../testBiker.mjs";

/* TestBiker can give you the test results in JSON */

function testJson() {
    let json =
        '{"name":"Grilled Cheese","ingredients":["two slices of bread","two slices of American cheese","butter"],"steps":["1. Make a cheese sandwich","2. Grill it"]}';
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

// Just pretend this is an API call to send the results elsewhere
console.log(JSON.parse(results));
