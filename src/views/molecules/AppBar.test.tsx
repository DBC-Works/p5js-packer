import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { settingsAtom } from '../../states/atoms'
import { setupComponentWithStateProviderUnderTest } from '../../testUtils'
import { AppBar } from './AppBar'

vi.mock('views/atoms/P5JsSandBox')

describe('"Edit" page component', () => {
  const setup = () => {
    setupComponentWithStateProviderUnderTest(<AppBar />, [
      [settingsAtom, { hashTag: '#つぶやきProcessing' }],
    ])
  }

  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockImplementation(async () =>
      Promise.resolve(new Response('{ "key": "value" }', { status: 200 })),
    )
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  it('should update version settings when type new text', async () => {
    // arrange
    setup()
    await userEvent.click(screen.getByTitle('Settings'))

    // act
    await userEvent.clear(screen.getByLabelText('Version'))
    await userEvent.type(screen.getByLabelText('Version'), '2.1.2')

    // assert
    expect(screen.getByDisplayValue('2.1.2')).toBeInTheDocument()
  })

  it('should report invalid when specified version does not exist', async () => {
    try {
      // arrange
      vi.spyOn(global, 'fetch').mockImplementation(async () =>
        Promise.resolve(new Response('{ "key": "value" }', { status: 404 })),
      )

      setup()
      await userEvent.click(screen.getByTitle('Settings'))

      // act
      await userEvent.clear(screen.getByLabelText('Version'))
      await userEvent.type(screen.getByLabelText('Version'), '99.99.99')

      // assert
      expect(await screen.findByText('Unable to confirm existence')).toBeInTheDocument()
    } finally {
      vi.restoreAllMocks()
    }
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
