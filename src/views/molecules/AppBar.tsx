import { css } from '@emotion/react'
import SettingsIcon from '@mui/icons-material/Settings'
import MuiAppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { type JSX, useCallback, useState } from 'react'

// @ts-expect-error
import GitHubIcon from '../../assets/icons/github-mark-white.svg?react'

import { SettingsDialog } from './SettingsDialog'

const CSS_ICON_SIZE = css({
  width: 32,
  height: 32,
})

/**
 * App bar component
 * @returns JSX Element
 */
export const AppBar: React.FC = (): JSX.Element => {
  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false)

  const handleClickSettings = useCallback((): void => {
    setOpenSettingsDialog(true)
  }, [])
  const handleCloseSettingsDialog = useCallback((): void => {
    setOpenSettingsDialog(false)
  }, [])

  return (
    <>
      <MuiAppBar position="static" sx={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            p5.js packer
          </Typography>
          <Button title="Settings" onClick={handleClickSettings} color="inherit">
            <span
              css={css(
                {
                  marginTop: 10,
                  paddingRight: 8,
                },
                CSS_ICON_SIZE,
              )}
            >
              <SettingsIcon
                css={css({
                  scale: '150%',
                })}
              />
            </span>
          </Button>
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
      {openSettingsDialog && <SettingsDialog onClose={handleCloseSettingsDialog} />}
    </>
  )
}
