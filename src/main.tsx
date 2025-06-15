import React, { type JSX } from 'react'
import ReactDOM from 'react-dom/client'

import { Edit } from './views/pages/Edit'
import './i18n'

//
// Components
//

/**
 * Application component
 * @returns JSX Element
 */
export const P5JsPacker: React.FC = (): JSX.Element => <Edit />

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
        <P5JsPacker />
      </React.StrictMode>,
    )
  } else {
    setTimeout(initApp, 100)
  }
}

initApp()
