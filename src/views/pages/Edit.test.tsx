import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { setupComponentWithStateProviderUnderTest } from '../../testUtils'
import { Edit } from './Edit'

describe('"Edit" page component', () => {
  const setup = () => {
    setupComponentWithStateProviderUnderTest(<Edit />)
  }

  it('should contains "Code" Tab and "Canvas" Tab', () => {
    // arrange & act
    setup()

    // assert
    expect(screen.getByRole('tab', { name: 'Code' })).toBeInTheDocument
    expect(screen.getByRole('tab', { name: 'Canvas' })).toBeInTheDocument
  })

  describe('"Code" tab', () => {
    it('should enable "Minify & Run" button when the verbose code is entered', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const textarea = screen.getByLabelText('verbose code')
      await userEvent.clear(textarea)
      expect(screen.getByRole('button', { name: 'Minify & Run' })).toBeDisabled()

      // act
      await userEvent.type(textarea, 'console.log("Hello, p5.js!")')

      // assert
      expect(screen.getByRole('button', { name: 'Minify & Run' })).toBeEnabled()
    })

    it('should enable "Beautify" button when the minified is entered', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const textarea = screen.getByLabelText('minified')
      await userEvent.clear(textarea)
      expect(screen.getByRole('button', { name: 'Beautify' })).toBeDisabled()

      // act
      await userEvent.type(textarea, 'console.log("Hello, p5.js!")')

      // assert
      expect(screen.getByRole('button', { name: 'Beautify' })).toBeEnabled()
    })

    it('should update character count when the minified is entered', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const textarea = screen.getByLabelText('minified')
      await userEvent.clear(textarea)
      const text = 'console.log("Hello, p5.js!")'

      // act
      await userEvent.type(textarea, text)

      // assert
      expect(screen.getByText(`${text.length}`)).toBeInTheDocument()
    })

    it('should select "Canvas" tab when "Minify & Run" button is clicked', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const textarea = screen.getByLabelText('verbose code')
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'const msg = "Hello, p5.js!"')

      // act
      await userEvent.click(screen.getByRole('button', { name: 'Minify & Run' }))

      // assert
      expect(screen.getByTitle('canvas')).toBeInTheDocument()
    })

    it('should set minified code when "Minify & Run" button is clicked', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const textarea = screen.getByLabelText('verbose code')
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'const msg = "Hello, p5.js!"')

      // act
      await userEvent.click(screen.getByRole('button', { name: 'Minify & Run' }))

      // assert
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      expect(screen.getByLabelText('minified')).toHaveTextContent(
        'const msg="Hello, p5.js!";// #つぶやきProcessing',
      )
    })

    it('should set beautified code when "Beautify" button is clicked', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const textarea = screen.getByLabelText('minified')
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'const msg="Hello, p5.js!";// #つぶやきProcessing')

      // act
      await userEvent.click(screen.getByRole('button', { name: 'Beautify' }))

      // assert
      expect(screen.getByLabelText('verbose code')).toHaveTextContent(
        'const msg = "Hello, p5.js!"; // #つぶやきProcessing',
      )
    })
  })

  describe('"Canvas" tab', () => {
    it('should not contain "Beautify" button and "Minify & Run" button', async () => {
      // arrange
      setup()

      // act
      await userEvent.click(screen.getByRole('tab', { name: 'Canvas' }))

      // assert
      expect(screen.queryByRole('button', { name: 'Beautify' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Minify & Run' })).not.toBeInTheDocument()
    })
  })
})
