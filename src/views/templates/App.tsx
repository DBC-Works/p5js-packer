import { css } from '@emotion/react'
import type { JSX } from 'react'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { AppBar, Toolbar, Typography } from '@mui/material'
import { GlobalStyles } from '../GlobalStyles'

const CSS_CONTAINER = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

const CSS_HEADER = css({
  flexGrow: 0,
})

const CSS_MAIN = css({
  flexGrow: 1,
  display: 'flex',
  margin: '0 1.5rem',
})

type Props = React.ComponentProps<'main'>

/**
 * App template component
 * @param props Props
 * @param props.children Children
 * @returns JSX Element
 */
export const App: React.FC<Props> = ({ children }): JSX.Element => (
  <div css={CSS_CONTAINER}>
    <GlobalStyles />
    <div css={CSS_HEADER}>
      <AppBar position="static" sx={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            p5.js packer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    <main css={CSS_MAIN}>{children}</main>
  </div>
)
