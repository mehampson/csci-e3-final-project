class Recipe {
    constructor(name, ingredients, steps) {
        this.name = name;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}

// A mock request function that derserializes an object from an API response payload
function getRecipeFromAPI(recipeJson) {
    let recipe = JSON.parse(recipeJson);
    return new Recipe(recipe.name, recipe.ingredients, recipe.steps);
}

export { Recipe, getRecipeFromAPI };
