import { Global, css } from '@emotion/react'
import type { JSX } from 'react'

const globalStyles = css`
:root {
  --gap-unit: 1.5rem;
}

html,
body,
div#root {
  height: 100%;
}
body {
  margin: 0;
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "BIZ UDPGothic",
    Meiryo,
    sans-serif;
  padding: 0 0 env(safe-area-inset-bottom);
}
div#root {
  overflow: auto;
}
a {
  text-decoration-line: none;
}
details > summary {
  cursor: pointer;
}
textarea {
  resize: none;
}
`

/**
 * Global style definition component
 * @returns JSX.Element
 */
export const GlobalStyles: React.FC = (): JSX.Element => <Global styles={globalStyles} />
