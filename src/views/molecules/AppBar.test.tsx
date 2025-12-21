import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { settingsAtom } from '../../states/atoms'
import { setupComponentWithStateProviderUnderTest } from '../../testUtils'
import { AppBar } from './AppBar'

describe('"Edit" page component', () => {
  const setup = () => {
    setupComponentWithStateProviderUnderTest(<AppBar />, [
      [settingsAtom, { hashTag: '#つぶやきProcessing' }],
    ])
  }

  it('should open settings dialog when clicking settings button', async () => {
    // arrange
    setup()

    // act
    await userEvent.click(screen.getByTitle('Settings'))

    // assert
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })

  it('should update hash tag settings when type new text', async () => {
    // arrange
    setup()
    await userEvent.click(screen.getByTitle('Settings'))

    // act
    await userEvent.clear(screen.getByLabelText('Hash tag'))
    await userEvent.type(screen.getByLabelText('Hash tag'), '#NewHashTag')

    // assert
    expect(screen.getByDisplayValue('#NewHashTag')).toBeInTheDocument()
  })

  it('should close dialog when clicking close button', async () => {
    // arrange
    setup()
    await userEvent.click(screen.getByTitle('Settings'))

    // act
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    // assert
    expect(screen.queryByRole('heading', { name: 'Settings' })).not.toBeInTheDocument()
  })
})
