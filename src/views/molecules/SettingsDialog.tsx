import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAtomValue, useSetAtom } from 'jotai'
import { type JSX, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { getHashTagSettingAtom, setHashTagSettingAtom } from '../../states/atoms'

/**
 * Hash tag text field component
 * @returns JSX Element
 */
const HashTagTextField: React.FC = (): JSX.Element => {
  const hashTag = useAtomValue(getHashTagSettingAtom)
  const setHashTag = useSetAtom(setHashTagSettingAtom)

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
      label="Hash tag"
      value={hashTag}
      onChange={handleChangeHashTag}
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
        <Typography variant="h6" component="h3" sx={CSS_DIALOG_HEADING}>
          {t('Minification')}
        </Typography>
        <HashTagTextField />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Close')}</Button>
      </DialogActions>
    </Dialog>
  )
}
