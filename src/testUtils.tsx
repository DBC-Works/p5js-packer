import { type RenderResult, render } from '@testing-library/react'
import { type UserEvent, userEvent } from '@testing-library/user-event'
import { Provider, type WritableAtom } from 'jotai'
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type AtomValuesType = Iterable<readonly [WritableAtom<unknown, [any], unknown>, unknown]>
type JotaiPropsType = {
  atomValues: AtomValuesType
  children: JSX.Element
}

/**
 * Hydrate atoms component
 * @param props Props
 * @param props.initialValues State initial value
 * @param props.children Children
 * @returns JSX Element
 */
const HydrateAtoms = ({ atomValues, children }: JotaiPropsType): JSX.Element => {
  useHydrateAtoms(new Map(atomValues))
  return children
}

/**
 * Test provider component
 * @param props Props
 * @param props.atomValues State initial value
 * @param props.children Children
 * @returns JSX Element
 */
export const TestProvider = ({ atomValues, children }: JotaiPropsType): JSX.Element => (
  <Provider>
    <HydrateAtoms atomValues={atomValues}>{children}</HydrateAtoms>
  </Provider>
)

/**
 * Set up component with state provider under test
 * @param component Component under test
 * @param initialValues Initial values
 * @returns Set up result for test
 */
export const setupComponentWithStateProviderUnderTest = (
  component: JSX.Element,
  initialValues?: AtomValuesType,
): SetUpResult =>
  setupComponentUnderTest(<TestProvider atomValues={initialValues ?? []}>{component}</TestProvider>)
