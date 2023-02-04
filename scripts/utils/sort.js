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
  const chosenIngredients = []
  let isInRecipe = true

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].type === TAG_TYPES.ingredients) {
      chosenIngredients.push(tags[i])
    }
  }

  if (chosenIngredients.length !== 0) {
    for (let i = 0; i < chosenIngredients.length; i++) {
      let ingredientFound = false
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].ingredient === chosenIngredients[i].name) {
          ingredientFound = true
        }
      }
      if (!ingredientFound) {
        isInRecipe = false
        break
      }
    }
  }
  return isInRecipe
}

/**
 * Return if the recipe contain all appliances in tags
 * @param {Recipe} recipe
 * @return {boolean}
 */
function checkTagApplianceInRecipe (recipe) {
  const chosenAppliance = []

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].type === TAG_TYPES.appliance) {
      chosenAppliance.push(tags[i])
    }
  }

  if (chosenAppliance.length !== 0) {
    for (let i = 0; i < chosenAppliance.length; i++) {
      if (recipe.appliance === chosenAppliance[i].name) {
        return true
      }
    }
  } else {
    return true
  }

  return false
}

/**
 * Return if the recipe contain all ustensils in tags
 * @param {Recipe} recipe
 * @return {boolean}
 */
function checkTagUstensilsInRecipe (recipe) {
  const chosenUstensils = []
  let isInRecipe = true

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].type === TAG_TYPES.ustensils) {
      chosenUstensils.push(tags[i])
    }
  }

  if (chosenUstensils.length !== 0) {
    for (let i = 0; i < chosenUstensils.length; i++) {
      let ustensilsFound = false
      for (let j = 0; j < recipe.ustensils.length; j++) {
        if (recipe.ustensils[j] === chosenUstensils[i].name) {
          ustensilsFound = true
        }
      }
      if (!ustensilsFound) {
        isInRecipe = false
        break
      }
    }
  }
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

  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchValue.toLowerCase())) {
      isSearchInIngredients = true
      break
    }
  }

  return isRecipeValid || isSearchInIngredients
}

/**
 * Return all valid recipes from search value and tags
 * @param {string} searchValue
 * @return {Array<Recipe>}
 */
export function sortMedias (searchValue) {
  const recipesArray = []

  for (let i = 0; i < recipesData.length; i++) {
    if (searchInRecipe(recipesData[i], searchValue) &&
      checkTagIngredientsInRecipe(recipesData[i]) &&
      checkTagApplianceInRecipe(recipesData[i]) &&
      checkTagUstensilsInRecipe(recipesData[i])) {
      recipesArray.push(recipesData[i])
    }
  }

  return recipesArray
}
