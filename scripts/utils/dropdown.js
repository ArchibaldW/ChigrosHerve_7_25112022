/* eslint-disable no-unused-vars */
function openIngredients() {
  document.getElementById('ingredients_dropdown_content').classList.add('show')
  document.querySelector('#ingredients_dropdown .dropbtn').classList.remove('show')
}

function closeIngredients() {
  document.getElementById('ingredients_dropdown_content').classList.remove('show')
  document.querySelector('#ingredients_dropdown .dropbtn').classList.add('show')
}

function openAppliance() {
  document.getElementById('appliance_dropdown_content').classList.add('show')
  document.querySelector('#appliance_dropdown .dropbtn').classList.remove('show')
}

function closeAppliance() {
  document.getElementById('appliance_dropdown_content').classList.remove('show')
  document.querySelector('#appliance_dropdown .dropbtn').classList.add('show')
}

function openUstensils() {
  document.getElementById('ustensils_dropdown_content').classList.add('show')
  document.querySelector('#ustensils_dropdown .dropbtn').classList.remove('show')
}

function closeUstensils() {
  document.getElementById('ustensils_dropdown_content').classList.remove('show')
  document.querySelector('#ustensils_dropdown .dropbtn').classList.add('show')
}

function dropdownIngredients() {
  openIngredients()
  closeAppliance()
  closeUstensils()
}

function dropdownAppliance() {
  openAppliance()
  closeIngredients()
  closeUstensils()
}

function dropdownUstensils() {
  openUstensils()
  closeIngredients()
  closeAppliance()
}

/**
 * Close the dropdowns in given conditions
 * @param {any} event
 */
window.onclick = function (event) {
  const ingredientsDropdown = document.getElementById('ingredients_dropdown_content')
  const applianceDropdown = document.getElementById('appliance_dropdown_content')
  const ustensilsDropdown = document.getElementById('ustensils_dropdown_content')
  if (!event.target.matches('.dropbtn') &&
    !event.target.matches('.fa-chevron-down') &&
    !ingredientsDropdown.contains(event.target) &&
    !applianceDropdown.contains(event.target) &&
    !ustensilsDropdown.contains(event.target)) {
    if (ingredientsDropdown.classList.contains('show')) {
      closeIngredients()
    }
    if (applianceDropdown.classList.contains('show')) {
      closeAppliance()
    }
    if (ustensilsDropdown.classList.contains('show')) {
      closeUstensils()
    }
  }
}
