import { type RenderResult, render } from '@testing-library/react'
import { type UserEvent, userEvent } from '@testing-library/user-event'
import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import React, { type JSX } from 'react'

import './i18n'

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

type JotaiPropsType = {
  initialValues: []
  children: JSX.Element
}

/**
 * Hydrate atoms component
 * @param props Props
 * @param props.initialValues State initial value
 * @param props.children Children
 * @returns JSX Element
 */
const HydrateAtoms = ({ initialValues, children }: JotaiPropsType): JSX.Element => {
  useHydrateAtoms(initialValues)
  return children
}

/**
 * Test provider component
 * @param props Props
 * @param props.initialValues State initial value
 * @param props.children Children
 * @returns JSX Element
 */
export const TestProvider = ({ initialValues, children }: JotaiPropsType): JSX.Element => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
)

/**
 * Set up component with state provider under test
 * @param component Component under test
 * @param initialPageSet Initial page set
 * @returns Set up result for test
 */
export const setupComponentWithStateProviderUnderTest = (component: JSX.Element): SetUpResult =>
  setupComponentUnderTest(<TestProvider initialValues={[]}>{component}</TestProvider>)
