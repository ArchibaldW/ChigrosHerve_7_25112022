import Api from './api/Api.js'
import RecipeFactory from './factory/RecipeFactory.js'
import RecipeCard from './template/RecipeCard.js'
import { createCheckbox, createHtmlElement } from './utils/createElements.js'
import { sortMedias } from './utils/sort.js'

export let tags = []
export let ingredientTags = []
export let applianceTags = []
export let ustensilTags = []
export let recipesData = []

function initNewChosenTag (checkbox, type) {
  const searchBar = document.getElementById('search_bar')
  const newTag = createHtmlElement('button', checkbox.value)
  newTag.innerHTML = `${checkbox.value} <em class="fa-regular fa-circle-xmark"></em>`
  newTag.dataset.type = type
  newTag.dataset.tag_value = checkbox.value
  newTag.querySelector('.fa-regular').addEventListener('click', async () => {
    newTag.parentNode.removeChild(newTag)
    console.log(tags)
    tags = tags.filter(tag => tag.type !== newTag.dataset.type || tag.name !== newTag.dataset.tag_value)
    console.log(tags)
    const newRecipes = searchBar.value.length >= 3 ? await sortMedias(searchBar.value) : await sortMedias('')
    displayRecipesData(newRecipes)
    initTags(newRecipes)
  })
  return newTag
}

function createNewChosenTag (checkbox) {
  const chosenTags = document.getElementById('chosen_tags')
  const chosenTagsArray = document.querySelectorAll('#chosen_tags > *')
  const type = checkbox.parentNode.parentNode.id
  let tagAlreadyExist = false
  if (chosenTagsArray.length !== 0) {
    for (const i in chosenTagsArray) {
      if (chosenTagsArray[i].dataset && chosenTagsArray[i].dataset.tag_value === checkbox.value && chosenTagsArray[i].dataset.type === type) {
        tagAlreadyExist = true
      }
    }
  }
  if (!tagAlreadyExist) {
    const newTag = initNewChosenTag(checkbox, type)
    chosenTags.appendChild(newTag)
    tags.push({ type, name: checkbox.value })
  } else {
    alert('Tag already exist')
  }
}

function searchInIngredientTags (searchValue) {
  const searchResults = []
  for (const i in ingredientTags) {
    if (ingredientTags[i].toLowerCase().includes(searchValue.toLowerCase())) {
      searchResults.push(ingredientTags[i])
    }
  }
  return searchResults
}

function initIngredientTagsSearch () {
  const searchIngredients = document.getElementById('search_ingredients')
  const ingredientsSelect = document.getElementById('ingredients')
  const searchBar = document.getElementById('search_bar')
  searchIngredients.addEventListener('input', () => {
    const searchResult = searchInIngredientTags(searchIngredients.value)
    ingredientsSelect.innerHTML = ''
    for (const i in searchResult) {
      ingredientsSelect.appendChild(createCheckbox(searchResult[i].toLowerCase(), searchResult[i]))
    }

    const checkboxes = document.querySelectorAll("#ingredients input[type='checkbox']")
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', async () => {
        createNewChosenTag(checkbox)
        const newRecipes = searchBar.value.length >= 3 ? await sortMedias(searchBar.value) : await sortMedias('')
        displayRecipesData(newRecipes)
        initTags(newRecipes)
        searchIngredients.value = ''
      })
    })
  })
}

function searchInApplianceTags (searchValue) {
  const searchResults = []
  for (const i in applianceTags) {
    if (applianceTags[i].toLowerCase().includes(searchValue.toLowerCase())) {
      searchResults.push(applianceTags[i])
    }
  }
  return searchResults
}

function initApplianceTagsSearch () {
  const searchAppliance = document.getElementById('search_appliance')
  const applianceSelect = document.getElementById('appliance')
  const searchBar = document.getElementById('search_bar')
  searchAppliance.addEventListener('input', () => {
    const searchResult = searchInApplianceTags(searchAppliance.value)
    applianceSelect.innerHTML = ''
    for (const i in searchResult) {
      applianceSelect.appendChild(createCheckbox(searchResult[i].toLowerCase(), searchResult[i]))
    }

    const checkboxes = document.querySelectorAll("#appliance input[type='checkbox']")
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', async () => {
        createNewChosenTag(checkbox)
        const newRecipes = searchBar.value.length >= 3 ? await sortMedias(searchBar.value) : await sortMedias('')
        displayRecipesData(newRecipes)
        initTags(newRecipes)
        searchAppliance.value = ''
      })
    })
  })
}

function searchInUstensilTags (searchValue) {
  const searchResults = []
  for (const i in ustensilTags) {
    if (ustensilTags[i].toLowerCase().includes(searchValue.toLowerCase())) {
      searchResults.push(ustensilTags[i])
    }
  }
  return searchResults
}

function initUstensilTagsSeach () {
  const searchUstensils = document.getElementById('search_ustensils')
  const ustensilsSelect = document.getElementById('ustensils')
  const searchBar = document.getElementById('search_bar')
  searchUstensils.addEventListener('input', () => {
    const searchResult = searchInUstensilTags(searchUstensils.value)
    ustensilsSelect.innerHTML = ''
    for (const i in searchResult) {
      ustensilsSelect.appendChild(createCheckbox(searchResult[i].toLowerCase(), searchResult[i]))
    }

    const checkboxes = document.querySelectorAll("#ustensils input[type='checkbox']")
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', async () => {
        createNewChosenTag(checkbox)
        const newRecipes = searchBar.value.length >= 3 ? await sortMedias(searchBar.value) : await sortMedias('')
        displayRecipesData(newRecipes)
        initTags(newRecipes)
        searchUstensils.value = ''
      })
    })
  })
}

function setIngredientTags (recipesData) {
  const ingredientSelect = document.getElementById('ingredients')
  ingredientSelect.innerHTML = ''
  const ingredientArray = []
  recipesData.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredientArray.find(element => element === ingredient.ingredient)) {
        ingredientArray.push(ingredient.ingredient)
      }
    })
  })
  ingredientTags = []
  ingredientArray.forEach(ingredient => {
    ingredientSelect.appendChild(createCheckbox(ingredient.toLowerCase(), ingredient))
    ingredientTags.push(ingredient)
  })
}

function setApplianceTags (recipesData) {
  const applianceSelect = document.getElementById('appliance')
  applianceSelect.innerHTML = ''
  const applianceArray = []
  recipesData.forEach(recipe => {
    if (!applianceArray.find(element => element === recipe.appliance)) {
      applianceArray.push(recipe.appliance)
    }
  })
  applianceTags = []
  applianceArray.forEach(appliance => {
    applianceSelect.appendChild(createCheckbox(appliance.toLowerCase(), appliance))
    applianceTags.push(appliance)
  })
}

function setUstensilTags (recipesData) {
  const ustensilSelect = document.getElementById('ustensils')
  ustensilSelect.innerHTML = ''
  const ustensilsArray = []
  recipesData.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      if (!ustensilsArray.find(element => element === ustensil)) {
        ustensilsArray.push(ustensil)
      }
    })
  })
  ustensilTags = []
  ustensilsArray.forEach(ustensil => {
    ustensilSelect.appendChild(createCheckbox(ustensil.toLowerCase(), ustensil))
    ustensilTags.push(ustensil)
  })
}

function setRecipeTags (recipesData) {
  setIngredientTags(recipesData)
  setApplianceTags(recipesData)
  setUstensilTags(recipesData)
}

function initTags (recipesData) {
  setRecipeTags(recipesData)
  const searchBar = document.getElementById('search_bar')
  const checkboxes = document.querySelectorAll("input[type='checkbox']")
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', async () => {
      createNewChosenTag(checkbox)
      const newRecipes = searchBar.value.length >= 3 ? await sortMedias(searchBar.value) : await sortMedias('')
      displayRecipesData(newRecipes)
      initTags(newRecipes)
    })
  })
  initIngredientTagsSearch()
  initApplianceTagsSearch()
  initUstensilTagsSeach()
}

function initBaseListeners () {
  const searchBar = document.getElementById('search_bar')
  searchBar.addEventListener('input', async () => {
    const newRecipes = searchBar.value.length >= 3 ? await sortMedias(searchBar.value) : await sortMedias('')
    displayRecipesData(newRecipes)
    initTags(newRecipes)
  })
}

function displayRecipesData (recipesData) {
  const recipesSection = document.getElementById('recipes_section')
  recipesSection.innerHTML = ''
  recipesData.forEach(recipe => {
    const template = new RecipeCard(recipe)
    recipesSection.appendChild(template.createRecipeCard())
  })
}

export async function retrieveRecipes () {
  const recipes = await (new Api()).getDatas()
  recipesData = recipes.map(recipe => new RecipeFactory(recipe))
}

async function init () {
  await retrieveRecipes()
  displayRecipesData(recipesData)
  initBaseListeners()
  initTags(recipesData)
}

init()
