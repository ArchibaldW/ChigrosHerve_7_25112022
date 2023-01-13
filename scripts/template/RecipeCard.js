export default class RecipeCard {
  constructor (media) {
    this._media = media
  }

  createRecipeCard () {
    const article = document.createElement('article')
    article.classList.add('recipe_card')
    let articleHTML =
    `
    <div class="card_img"></div>
    <div class="card_main">
      <div class="card_header">
        <h2 class="card_title">${this._media.name}</h2>
        <div class="card_time">
          <em class="fa-regular fa-clock"></em>
          <span>${this._media.time} min</span>
        </div>
      </div>
      <div class="card_details">
        <div class="card_ingredients">
    `

    this._media.ingredients.forEach(ingredient => {
      articleHTML +=
      `
          <div class="card_ingredient">
            <span>${ingredient.ingredient}</span> 
      `
      if (ingredient.quantity) {
        articleHTML +=
        `
        : <span>${ingredient.quantity}
        `
        if (ingredient.unit) {
          articleHTML +=
          `
          ${ingredient.unit}
          `
        }
        articleHTML +=
        `
        </span>
        `
      }

      articleHTML += '</div>'
    })

    articleHTML +=
    `
        </div>
        <div class="card_description">${this._media.description}</div>
      </div>
    </div>
    `

    article.innerHTML = articleHTML
    return (article)
  }
}
