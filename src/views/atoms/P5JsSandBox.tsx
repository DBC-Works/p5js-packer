import { css } from '@mui/material'
import { useAtomValue } from 'jotai'
import type { JSX } from 'react'

import { makeP5jsCdnUrl } from '../../interfaces/web'
import { getMinifiedAtom, getP5JsVersionSettingAtom } from '../../states/atoms'

/**
 * p5.js sand box component
 * @returns JSX Element
 */
export const P5JsSandBox: React.FC = (): JSX.Element => {
  const minified = useAtomValue(getMinifiedAtom)
  const version = useAtomValue(getP5JsVersionSettingAtom)
  const p5jsCdnUrl = makeP5jsCdnUrl(version)

  return (
    <iframe
      sandbox="allow-scripts"
      title="canvas"
      css={css({ flexGrow: 1, width: 'calc(100% - 0.5rem)', border: 'none' })}
      srcDoc={`
<script src="${p5jsCdnUrl}"></script>
<script>window.devicePixelRatio=1;${minified}</script>
`}
    />
  )
}
