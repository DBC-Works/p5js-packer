import { css as emotionCss, type SerializedStyles } from '@emotion/react'
import type { JSX } from 'react'

const CSS_FLEX_COLUMN_CONTAINER = emotionCss({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

type Props = React.ComponentProps<'div'> & {
  css?: SerializedStyles
}

/**
 * Flex column container component
 * @param props props
 * @returns JSX Element
 */
export const FlexColumnContainer: React.FC<Props> = (props: Props): JSX.Element => {
  const { children, css, ...rest } = props

  return (
    <div css={[css, CSS_FLEX_COLUMN_CONTAINER]} {...rest}>
      {children}
    </div>
  )
}
