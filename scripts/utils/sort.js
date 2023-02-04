import {
  recipesData,
  tags
} from '../main.js'

const TAG_TYPES = {
  ingredients: 'ingredients',
  appliance: 'appliance',
  ustensils: 'ustensils'
}

/**
 * Return if the recipe contain all ingredients in tags
 * @param {Recipe} recipe
 * @return {boolean}
 */
function checkTagIngredientsInRecipe (recipe) {
  let isInRecipe = true
  const chosenIngredients = tags.filter(tag => tag.type === TAG_TYPES.ingredients)
  chosenIngredients.forEach(ingredient => {
    if (!recipe.ingredients.find(element => element.ingredient === ingredient.name)) {
      isInRecipe = false
    }
  })
  return isInRecipe
}

/**
 * Return if the recipe contain all appliances in tags
 * @param {Recipe} recipe
 * @return {boolean}
 */
function checkTagApplianceInRecipe (recipe) {
  let isInRecipe = true
  const chosenaAppliance = tags.filter(tag => tag.type === TAG_TYPES.appliance)
  chosenaAppliance.forEach(appliance => {
    if (recipe.appliance !== appliance.name) {
      isInRecipe = false
    }
  })
  return isInRecipe
}

/**
 * Return if the recipe contain all ustensils in tags
 * @param {Recipe} recipe
 * @return {boolean}
 */
function checkTagUstensilsInRecipe (recipe) {
  let isInRecipe = true
  const chosenUstensils = tags.filter(tag => tag.type === TAG_TYPES.ustensils)
  chosenUstensils.forEach(ustensils => {
    if (!recipe.ustensils.find(element => element === ustensils.name)) {
      isInRecipe = false
    }
  })
  return isInRecipe
}

/**
 * Return if the search value is in title, description or ingredient
 * @param {Recipe} recipe
 * @param {string} searchValue
 * @return {boolean}
 */
function searchInRecipe (recipe, searchValue) {
  let isRecipeValid = false
  let isSearchInIngredients = false
  if (recipe.name.toLowerCase().includes(searchValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchValue.toLowerCase())) {
    isRecipeValid = true
  }
  recipe.ingredients.forEach(ingredient => {
    if (ingredient.ingredient.toLowerCase().includes(searchValue.toLowerCase())) {
      isSearchInIngredients = true
    }
  })
  return isRecipeValid && isSearchInIngredients
}

/**
 * Return all valid recipes from search value and tags
 * @param {string} searchValue
 * @return {Array<Recipe>}
 */
export function sortMedias (searchValue) {
  return recipesData.filter(recipe => {
    return searchInRecipe(recipe, searchValue) &&
    checkTagIngredientsInRecipe(recipe) &&
    checkTagApplianceInRecipe(recipe) &&
    checkTagUstensilsInRecipe(recipe)
  })
}
