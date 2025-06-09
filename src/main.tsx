import React, { type JSX } from 'react'
import ReactDOM from 'react-dom/client'

//
// Components
//

/**
 * Application component
 * @returns JSX Element
 */
export const App: React.FC = (): JSX.Element => <h1>p5.js packer</h1>

//
// Entry
//

/**
 * Initialize the application
 */
export const initApp = () => {
  const rootElement = document.querySelector('#root')
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    setTimeout(initApp, 100)
  }
}

initApp()
