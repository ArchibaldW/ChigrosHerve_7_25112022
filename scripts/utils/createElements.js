/**
 * Create a new HTML Element given a type
 * @param {string} type
 * @param {string} text
 * @return {any}
 */
export function createHtmlElement (type, text) {
  const element = document.createElement(type)
  element.textContent = text
  return element
}

/**
 * Create a new tag checkbox
 * @param {string} name
 * @param {string} text
 * @return {any}
 */
export function createCheckbox (name, text) {
  const element = document.createElement('div')
  element.classList.add('tag')

  const input = document.createElement('input')
  input.setAttribute('type', 'checkbox')
  input.id = name
  input.setAttribute('name', name)
  input.setAttribute('value', text)
  element.appendChild(input)

  const label = document.createElement('label')
  label.setAttribute('for', name)
  label.textContent = text
  element.appendChild(label)

  return element
}
