import { beforeAll, describe, expect, it } from 'vitest'

import { initApp } from './main'

describe('App', () => {
  beforeAll(() => {
    const rootElement = document.createElement('div')
    rootElement.id = 'root'
    document.body.appendChild(rootElement)
    initApp()
  })

  it('should display app title', () => {
    expect(document.querySelector('#root')).toHaveTextContent('p5.js packer')
  })
})
