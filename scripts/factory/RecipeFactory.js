import Recipe from '../model/Recipe.js'

export default class RecipeFactory {
  constructor (data) {
    return new Recipe(data)
  }
}
