import type { JSX } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/ext-language_tools'

type Props = {
  editorName: string
  height: string
  tabSize: number
  code: string
  onChange: (value: string) => void
}

/**
 * Code editor component
 * @param props Props
 * @param props.editorName Editor name
 * @param props.height Editor height
 * @param props.tabSize Tab size
 * @param props.code Code to edit
 * @param props.onChange Change handler
 * @returns JSX Element
 */
export const CodeEditor: React.FC<Props> = ({
  editorName,
  height,
  tabSize,
  code,
  onChange,
}: Props): JSX.Element => (
  <AceEditor
    name={editorName}
    mode="javascript"
    theme="xcode"
    fontSize={14}
    tabSize={tabSize}
    width="100%"
    height={height}
    showGutter={true}
    wrapEnabled={true}
    showPrintMargin={false}
    enableBasicAutocompletion={true}
    enableLiveAutocompletion={true}
    value={code}
    onChange={onChange}
  />
)
