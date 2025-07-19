import { getByRole, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { minifiedAtom, verboseCodeAtom } from '../../states/atoms'
import { setupComponentWithStateProviderUnderTest } from '../../testUtils'
import { Edit } from './Edit'

vi.mock('../molecules/CodeEditor')

describe('"Edit" page component', () => {
  const setup = () => {
    setupComponentWithStateProviderUnderTest(<Edit />, [
      [verboseCodeAtom, ''],
      [minifiedAtom, ''],
    ])
  }

  const getReactAceInnerTextArea = (testId: string): HTMLTextAreaElement => {
    return getByRole(screen.getByTestId(testId), 'textbox')
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
      expect(screen.getByRole('button', { name: 'Minify & Run' })).toBeDisabled()

      // act
      await userEvent.type(getReactAceInnerTextArea('verbose-code'), 'console.log("Hello, p5.js!")')

      // assert
      expect(screen.getByRole('button', { name: 'Minify & Run' })).toBeEnabled()
    })

    it('should enable "Beautify" button when the minified is entered', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      expect(screen.getByRole('button', { name: 'Beautify' })).toBeDisabled()

      // act
      await userEvent.type(getReactAceInnerTextArea('minified'), 'console.log("Hello, p5.js!")')

      // assert
      expect(screen.getByRole('button', { name: 'Beautify' })).toBeEnabled()
    })

    it('should update character count when the minified is entered', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      const text = 'console.log("Hello, p5.js!")'

      // act
      await userEvent.type(getReactAceInnerTextArea('minified'), text)

      // assert
      expect(screen.getByTestId('strict-character-count')).toHaveTextContent(`${text.length}`)
      expect(screen.getByTestId('approximate-character-count')).toHaveTextContent(`${text.length}`)
    })

    it('should select "Canvas" tab when "Minify & Run" button is clicked', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      await userEvent.type(getReactAceInnerTextArea('verbose-code'), 'const msg = "Hello, p5.js!"')

      // act
      await userEvent.click(screen.getByRole('button', { name: 'Minify & Run' }))

      // assert
      expect(screen.getByTitle('canvas')).toBeInTheDocument()
    })

    it('should set minified code when "Minify & Run" button is clicked', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      await userEvent.type(getReactAceInnerTextArea('verbose-code'), 'const msg = "Hello, p5.js!"')

      // act
      await userEvent.click(screen.getByRole('button', { name: 'Minify & Run' }))

      // assert
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      expect(getReactAceInnerTextArea('minified')).toHaveTextContent(
        'const msg="Hello, p5.js!"// #つぶやきProcessing',
      )
    })

    it('should set beautified code when "Beautify" button is clicked', async () => {
      // arrange
      setup()
      await userEvent.click(screen.getByRole('tab', { name: 'Code' }))
      await userEvent.type(
        getReactAceInnerTextArea('minified'),
        'const msg="Hello, p5.js!";// #つぶやきProcessing',
      )

      // act
      await userEvent.click(screen.getByRole('button', { name: 'Beautify' }))

      // assert
      expect(getReactAceInnerTextArea('verbose-code')).toHaveTextContent(
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
