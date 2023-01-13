export default class Api {
  async getDatas () {
    return fetch('/data/recipes.json')
      .then(res => res.json())
      .then(res => { return res.recipes })
      .catch(err => console.log('an error occurs', err))
  }
}
