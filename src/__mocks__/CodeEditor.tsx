import { TextareaAutosize } from '@mui/material'
import { type ChangeEvent, type JSX, useCallback } from 'react'

type Props = {
  editorName: string
  height: string
  tabSize: number
  code: string
  onChange: (value: string) => void
}

export const CodeEditor: React.FC<Props> = ({ code, onChange }: Props): JSX.Element => {
  const handleChangeTextArea = useCallback(
    (e: ChangeEvent<globalThis.HTMLTextAreaElement>) => {
      onChange(e.target?.value)
    },
    [onChange],
  )
  return <TextareaAutosize value={code} onChange={handleChangeTextArea} />
}
