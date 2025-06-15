import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { setupComponentUnderTest } from '../../testUtils'

import { Edit } from './Edit'

describe('"Edit" page component', () => {
  const setup = () => {
    setupComponentUnderTest(<Edit />)
  }

  it('should contains "Code" Tab and "Canvas" Tab', () => {
    // arrange & act
    setup()

    // assert
    expect(screen.getByRole('tab', { name: 'Code' })).toBeInTheDocument
    expect(screen.getByRole('tab', { name: 'Canvas' })).toBeInTheDocument
  })

  describe('"Code" tab', () => {
    it('should contains "Minify & Run" button', async () => {
      // arrange
      setup()

      // act
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))

      // assert
      const actual = screen.getByRole('button', { name: 'Minify & Run' })
      expect(actual).toBeInTheDocument()
      expect(actual).toBeDisabled()
    })

    it('should contains "Beautify" button', async () => {
      // arrange
      setup()

      // act
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))

      // assert
      const actual = screen.getByRole('button', { name: 'Beautify' })
      expect(actual).toBeInTheDocument()
      expect(actual).toBeDisabled()
    })
  })

  describe('"Canvas" tab', () => {
    it('should contains "Stop" button', async () => {
      // arrange & act
      setup()

      // act
      await userEvent.click(screen.getByRole('tab', { name: 'Canvas' }))

      // assert
      const actual = screen.getByRole('button', { name: 'Stop' })
      expect(actual).toBeInTheDocument()
      expect(actual).toBeDisabled()
    })
  })
})
