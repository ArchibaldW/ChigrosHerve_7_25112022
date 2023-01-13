import Api from './api/Api.js'
import RecipeFactory from './factory/RecipeFactory.js'
import RecipeCard from './template/RecipeCard.js'
import { createCheckbox, createHtmlElement } from './utils/createElements.js'
import { sortMedias } from './utils/sort.js'

export let tags = []

function initNewChosenTag (checkbox, type) {
  const searchBar = document.getElementById('search_bar')
  const newTag = createHtmlElement('button', checkbox.value)
  newTag.textContent = checkbox.value
  newTag.dataset.type = type
  newTag.addEventListener('click', async () => {
    newTag.parentNode.removeChild(newTag)
    tags = tags.filter(tag => tag.type !== newTag.dataset.type && tag.name !== newTag.textContent)
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
  chosenTagsArray.forEach(tag => {
    if (tag.textContent === checkbox.value && tag.dataset.type === type) {
      tagAlreadyExist = true
    }
  })
  if (!tagAlreadyExist) {
    const newTag = initNewChosenTag(checkbox, type)
    chosenTags.appendChild(newTag)
    tags.push({ type, name: checkbox.value })
  } else {
    alert('Tag already exist')
  }
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
  ingredientArray.forEach(ingredient => {
    ingredientSelect.appendChild(createCheckbox(ingredient.toLowerCase(), ingredient))
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
  applianceArray.forEach(appliance => {
    applianceSelect.appendChild(createCheckbox(appliance.toLowerCase(), appliance))
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
  ustensilsArray.forEach(ustensil => {
    ustensilSelect.appendChild(createCheckbox(ustensil.toLowerCase(), ustensil))
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
  return recipes.map(recipe => new RecipeFactory(recipe))
}

async function init () {
  const recipesData = await retrieveRecipes()
  displayRecipesData(recipesData)
  initBaseListeners()
  initTags(recipesData)
}

init()
