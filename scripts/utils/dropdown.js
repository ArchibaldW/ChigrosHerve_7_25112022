/* eslint-disable no-unused-vars */
function dropdownIngredients () {
  document.getElementById('ingredients_dropdown_content').classList.add('show')
  document.querySelector('#ingredients_dropdown .dropbtn').classList.remove('show')

  document.getElementById('appliance_dropdown_content').classList.remove('show')
  document.querySelector('#appliance_dropdown .dropbtn').classList.add('show')

  document.getElementById('ustensils_dropdown_content').classList.remove('show')
  document.querySelector('#ustensils_dropdown .dropbtn').classList.add('show')
}

function dropdownAppliance () {
  document.getElementById('ingredients_dropdown_content').classList.remove('show')
  document.querySelector('#ingredients_dropdown .dropbtn').classList.add('show')

  document.getElementById('appliance_dropdown_content').classList.add('show')
  document.querySelector('#appliance_dropdown .dropbtn').classList.remove('show')

  document.getElementById('ustensils_dropdown_content').classList.remove('show')
  document.querySelector('#ustensils_dropdown .dropbtn').classList.add('show')
}

function dropdownUstensils () {
  document.getElementById('ingredients_dropdown_content').classList.remove('show')
  document.querySelector('#ingredients_dropdown .dropbtn').classList.add('show')

  document.getElementById('appliance_dropdown_content').classList.remove('show')
  document.querySelector('#appliance_dropdown .dropbtn').classList.add('show')

  document.getElementById('ustensils_dropdown_content').classList.add('show')
  document.querySelector('#ustensils_dropdown .dropbtn').classList.remove('show')
}

window.onclick = function (event) {
  console.log(event.target)
  const ingredientsDropdown = document.getElementById('ingredients_dropdown_content')
  const applianceDropdown = document.getElementById('appliance_dropdown_content')
  const ustensilsDropdown = document.getElementById('ustensils_dropdown_content')
  if (!event.target.matches('.dropbtn') &&
  !event.target.matches('.fa-chevron-down') &&
  !ingredientsDropdown.contains(event.target) &&
  !applianceDropdown.contains(event.target) &&
  !ustensilsDropdown.contains(event.target)) {
    if (ingredientsDropdown.classList.contains('show')) {
      ingredientsDropdown.classList.remove('show')
      document.querySelector('#ingredients_dropdown .dropbtn').classList.add('show')
    }
    if (applianceDropdown.classList.contains('show')) {
      applianceDropdown.classList.remove('show')
      document.querySelector('#appliance_dropdown .dropbtn').classList.add('show')
    }
    if (ustensilsDropdown.classList.contains('show')) {
      ustensilsDropdown.classList.remove('show')
      document.querySelector('#ustensils_dropdown .dropbtn').classList.add('show')
    }
  }
}
