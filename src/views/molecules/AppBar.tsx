import { css } from '@emotion/react'
import { Link, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'
import type { JSX } from 'react'

// @ts-expect-error
import GitHubIcon from '../../assets/icons/github-mark-white.svg?react'

const CSS_ICON_SIZE = css({
  width: 32,
  height: 32,
})

/**
 * App bar component
 * @returns JSX Element
 */
export const AppBar: React.FC = (): JSX.Element => {
  return (
    <MuiAppBar position="static" sx={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          p5.js packer
        </Typography>
        <Link
          color="inherit"
          href="https://github.com/DBC-Works/p5js-packer"
          target="_blank"
          rel="noopener noreferrer"
          css={css(
            {
              display: 'inline-block',
              padding: 0,
              margin: 0,
            },
            CSS_ICON_SIZE,
          )}
        >
          <GitHubIcon
            css={css({
              scale: '33%',
              translate: '-34px -32px',
            })}
          />
        </Link>
      </Toolbar>
    </MuiAppBar>
  )
}
