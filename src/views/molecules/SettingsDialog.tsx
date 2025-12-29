import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { debounce } from 'es-toolkit/function'
import { useAtomValue, useSetAtom } from 'jotai'
import { type JSX, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { makeP5jsCdnUrl } from '../../interfaces/web'
import {
  getHashTagSettingAtom,
  getP5JsVersionSettingAtom,
  setHashTagSettingAtom,
  setP5JsVersionSettingAtom,
} from '../../states/atoms'

/**
 * Hash tag text field component
 * @returns JSX Element
 */
const HashTagTextField: React.FC = (): JSX.Element => {
  const hashTag = useAtomValue(getHashTagSettingAtom)
  const setHashTag = useSetAtom(setHashTagSettingAtom)
  const { t } = useTranslation()

  const handleChangeHashTag = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHashTag(event.target.value)
    },
    [setHashTag],
  )

  return (
    <TextField
      variant="outlined"
      fullWidth
      label={t('Hash tag')}
      value={hashTag}
      onChange={handleChangeHashTag}
    />
  )
}

/**
 * Version text field component
 * @returns JSX Element
 */
const P5JsVersionTextField: React.FC = (): JSX.Element => {
  const version = useAtomValue(getP5JsVersionSettingAtom)
  const setVersion = useSetAtom(setP5JsVersionSettingAtom)
  const { t } = useTranslation()

  const [notExist, setNotExist] = useState<boolean>(false)

  const checkExisting = debounce(async (version: string): Promise<void> => {
    let latest: boolean = false
    if (navigator.onLine !== false) {
      const url = makeP5jsCdnUrl(version)
      const response = await fetch(url, { method: 'HEAD' })
      latest = response.ok === false || response.status !== 200
    }
    if (latest !== notExist) {
      setNotExist(latest)
    }
  }, 200)

  useEffect(() => {
    checkExisting(version)
  })

  const handleChangeVersion = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setVersion(event.target.value)
      checkExisting(event.target.value)
    },
    [setVersion, checkExisting],
  )

  return (
    <TextField
      error={notExist}
      variant="outlined"
      fullWidth
      label={t('Version')}
      helperText={notExist ? t('Unable to confirm existence') : ' '}
      value={version}
      onChange={handleChangeVersion}
    />
  )
}

const CSS_DIALOG_HEADING = { marginBottom: '1rem', fontSize: '1rem' }

type Props = {
  onClose: () => void
}

/**
 * Settings dialog component
 * @param props Props
 * @param props.onClose Close event handler
 * @returns JSX Element
 */
export const SettingsDialog: React.FC<Props> = ({ onClose }): JSX.Element => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()

  return (
    <Dialog fullScreen={fullScreen} open={true}>
      <DialogTitle>{t('Settings')}</DialogTitle>
      <DialogContent sx={{ minWidth: '20rem' }}>
        <div css={{ marginBottom: '1rem' }}>
          <Typography variant="h6" component="h3" sx={CSS_DIALOG_HEADING}>
            {t('Minification')}
          </Typography>
          <HashTagTextField />
        </div>
        <div>
          <Typography variant="h6" component="h3" sx={CSS_DIALOG_HEADING}>
            {t('p5.js')}
          </Typography>
          <P5JsVersionTextField />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Close')}</Button>
      </DialogActions>
    </Dialog>
  )
}
