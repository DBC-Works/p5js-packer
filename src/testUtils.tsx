import { type RenderResult, render } from '@testing-library/react'
import { type UserEvent, userEvent } from '@testing-library/user-event'
import React from 'react'

/**
 * Set up result type
 */
type SetUpResult = {
  /**
   * User event
   */
  userEvent: UserEvent

  /**
   * Render result
   */
  renderResult: RenderResult
}

/**
 * Set up component under test
 * @param component Component under test
 * @returns Set up result for test
 */
export const setupComponentUnderTest = (component: React.ReactNode): SetUpResult => ({
  userEvent: userEvent.setup(),
  renderResult: render(<React.StrictMode>{component}</React.StrictMode>),
})
