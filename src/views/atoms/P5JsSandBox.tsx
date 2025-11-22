import { css } from '@mui/material'
import { useAtomValue } from 'jotai'
import type { JSX } from 'react'

import { getMinifiedAtom } from '../../states/atoms'

/**
 * p5.js sand box component
 * @returns JSX Element
 */
export const P5JsSandBox: React.FC = (): JSX.Element => {
  const minified = useAtomValue(getMinifiedAtom)

  return (
    <iframe
      sandbox="allow-scripts"
      title="canvas"
      css={css({ flexGrow: 1, width: 'calc(100% - 0.5rem)', border: 'none' })}
      srcDoc={`
<script src="https://cdn.jsdelivr.net/npm/p5@2.1.1/lib/p5.min.js"></script>
<script>window.devicePixelRatio=1;${minified}</script>
`}
    />
  )
}
