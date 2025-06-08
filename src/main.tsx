//
// Entry
//

export const initApp = () => {
  const rootElement = document.querySelector('#root')
  if (rootElement) {
    rootElement.textContent = 'p5.js packer'
  }
}

initApp()
