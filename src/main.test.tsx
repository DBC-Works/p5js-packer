import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { P5JsPacker } from './main'
import { setupComponentWithStateProviderUnderTest } from './testUtils'

vi.mock('views/atoms/P5JsSandBox')
vi.mock('views/molecules/CodeEditor')

describe('App', () => {
  it('should display app title', () => {
    // arrange & act
    setupComponentWithStateProviderUnderTest(<P5JsPacker />)

    // assert
    expect(screen.getByRole('heading', { level: 1, name: 'p5.js packer' })).toBeInTheDocument()
  })
})
