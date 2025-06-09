import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { setupComponentUnderTest } from './testUtils'

import { App } from './main'

describe('App', () => {
  it('should display app title', () => {
    // arrange & act
    setupComponentUnderTest(<App />)

    // assert
    expect(screen.getByRole('heading', { level: 1, name: 'p5.js packer' })).toBeInTheDocument()
  })
})
