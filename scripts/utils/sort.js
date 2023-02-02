import {
  recipesData,
  tags
} from '../main.js'

const TAG_TYPES = {
  ingredients: 'ingredients',
  appliance: 'appliance',
  ustensils: 'ustensils'
}

function checkTagIngredientsInRecipe (recipe) {
  const chosenIngredients = []

  for (const i in tags) {
    if (tags[i].type === TAG_TYPES.ingredients) {
      chosenIngredients.push(tags[i])
    }
  }

  if (chosenIngredients.length !== 0) {
    let foundUstensils = 0
    for (const i in chosenIngredients) {
      for (const j in recipe.ingredients) {
        if (recipe.ingredients[j].ingredient === chosenIngredients[i].name) {
          foundUstensils++
        }
      }
    }
    return foundUstensils === chosenIngredients.length
  } else {
    return true
  }
}

function checkTagApplianceInRecipe (recipe) {
  const chosenAppliance = []

  for (const i in tags) {
    if (tags[i].type === TAG_TYPES.appliance) {
      chosenAppliance.push(tags[i])
    }
  }

  if (chosenAppliance.length !== 0) {
    for (const i in chosenAppliance) {
      if (recipe.appliance === chosenAppliance[i].name) {
        return true
      }
    }
  } else {
    return true
  }

  return false
}

function checkTagUstensilsInRecipe (recipe) {
  const chosenUstensils = []

  for (const i in tags) {
    if (tags[i].type === TAG_TYPES.ustensils) {
      chosenUstensils.push(tags[i])
    }
  }

  if (chosenUstensils.length !== 0) {
    let foundUstensils = 0
    for (const i in chosenUstensils) {
      for (const j in recipe.ustensils) {
        if (recipe.ustensils[j] === chosenUstensils[i].name) {
          foundUstensils++
        }
      }
    }
    return foundUstensils === chosenUstensils.length
  } else {
    return true
  }
}

function searchInRecipe (recipe, searchValue) {
  let isRecipeValid = false
  let isSearchInIngredients = false

  if (recipe.name.toLowerCase().includes(searchValue.toLowerCase()) || recipe.description.toLowerCase().includes(searchValue.toLowerCase())) {
    isRecipeValid = true
  }

  for (const i in recipe.ingredients) {
    if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchValue.toLowerCase())) {
      isSearchInIngredients = true
      break
    }
  }

  return isRecipeValid || isSearchInIngredients
}

export async function sortMedias (searchValue) {
  const recipesArray = []

  for (const i in recipesData) {
    if (searchInRecipe(recipesData[i], searchValue) &&
      checkTagIngredientsInRecipe(recipesData[i]) &&
      checkTagApplianceInRecipe(recipesData[i]) &&
      checkTagUstensilsInRecipe(recipesData[i])) {
      recipesArray.push(recipesData[i])
    }
  }

  return recipesArray
}
