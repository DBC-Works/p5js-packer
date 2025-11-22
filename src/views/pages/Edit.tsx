import { Button, Snackbar, Tab, Tabs, Typography, css } from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import beautify from 'js-beautify'
import { type JSX, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { minify } from 'terser'

import {
  getMinifiedAtom,
  getVerboseCodeAtom,
  setMinifiedAtom,
  setVerboseCodeAtom,
  tabIndexAtom,
} from '../../states/atoms'
import { CodeEditor } from '../molecules/CodeEditor'
import { App } from '../templates/App'
import { FlexColumnContainer } from '../templates/FlexColumnContainer'

const ID_TAB_CODE = 'code-tab'
const ID_TAB_CANVAS = 'canvas-tab'
const ID_TAB_PANEL_CODE = 'code-tab-panel'
const ID_TAB_PANEL_CANVAS = 'canvas-tab-panel'

const CSS_FLEX_GROW_1 = css({ flexGrow: 1 })

const INDENT_SIZE = 2

/**
 * Count approximate characters
 * @see {@link https://gist.github.com/miguelmota/e8bbbb5dcc4ef867de5b5a7e47de2b1d}
 * @param str String to count approximate characters
 * @returns Approximate character count
 */
const countApproximateCharacters = (str: string): number => {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  const m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m?.length ?? 0)
}

/**
 * Code tab panel component
 * @returns JSX Element
 */
const CodeTabPanel: React.FC = (): JSX.Element => {
  const verboseCode = useAtomValue(getVerboseCodeAtom)
  const minified = useAtomValue(getMinifiedAtom)
  const setVerboseCode = useSetAtom(setVerboseCodeAtom)
  const setMinified = useSetAtom(setMinifiedAtom)
  const setTabIndex = useSetAtom(tabIndexAtom)
  const { t } = useTranslation()

  const handleChangeCode = useCallback(
    (value: string) => {
      setVerboseCode(value)
    },
    [setVerboseCode],
  )

  const handleClickBeautify = useCallback(async () => {
    setVerboseCode(
      await beautify(minified, {
        indent_size: INDENT_SIZE,
      }),
    )
  }, [minified, setVerboseCode])
  const handleClickRun = useCallback(async () => {
    try {
      const { code } = await minify(verboseCode)
      setMinified(code ? code.replace(/;$/, '// #つぶやきProcessing') : '')
      setTabIndex(1)
    } catch (error) {
      console.error(error.message)
      setMinified(error.message)
    }
  }, [verboseCode, setMinified, setTabIndex])

  return (
    <FlexColumnContainer
      role="tabpanel"
      id={ID_TAB_PANEL_CODE}
      aria-labelledby={ID_TAB_CODE}
      css={css({
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      })}
    >
      <Typography variant="h6" component="h2">
        {t('Verbose code')}
      </Typography>
      <div data-testid="verbose-code" css={CSS_FLEX_GROW_1}>
        <CodeEditor
          editorName={t('verbose code')}
          height="100%"
          tabSize={INDENT_SIZE}
          code={verboseCode}
          onChange={handleChangeCode}
        />
      </div>
      <div css={css({ width: '100%', margin: '1rem 0', display: 'flex', gap: '1rem' })}>
        <Button
          variant="outlined"
          disabled={minified.length === 0}
          css={CSS_FLEX_GROW_1}
          onClick={handleClickBeautify}
        >
          {t('Beautify')}
        </Button>
        <Button
          variant="outlined"
          disabled={verboseCode.length === 0}
          css={CSS_FLEX_GROW_1}
          onClick={handleClickRun}
        >
          {t('Minify & Run')}
        </Button>
      </div>
      <MinifiedRow />
    </FlexColumnContainer>
  )
}

/**
 * Canvas tab panel component
 * @returns JSX Element
 */
const CanvasTabPanel: React.FC = (): JSX.Element => {
  const minified = useAtomValue(getMinifiedAtom)

  return (
    <FlexColumnContainer
      role="tabpanel"
      id={ID_TAB_PANEL_CANVAS}
      aria-labelledby={ID_TAB_CANVAS}
      css={CSS_FLEX_GROW_1}
    >
      <FlexColumnContainer css={CSS_FLEX_GROW_1}>
        <iframe
          sandbox="allow-scripts"
          title="canvas"
          css={css({ flexGrow: 1, width: 'calc(100% - 0.5rem)', border: 'none' })}
          srcDoc={`
<script src="https://cdn.jsdelivr.net/npm/p5@2.0.3/lib/p5.min.js"></script>
<script>window.devicePixelRatio=1;${minified}</script>
`}
        />
      </FlexColumnContainer>
    </FlexColumnContainer>
  )
}

/**
 * Copy to clipboard button component
 * @returns JSX Element
 */
const CopyToClipboardButton: React.FC = () => {
  const minified = useAtomValue(getMinifiedAtom)
  const { t } = useTranslation()

  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false)
  const handleClickCopyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(minified)
    setCopyToClipboard(true)
  }, [minified])
  const handleCloseSnackbar = useCallback(() => {
    setCopyToClipboard(false)
  }, [])

  return (
    <div>
      <Button
        variant="outlined"
        disabled={minified.length === 0}
        onClick={handleClickCopyToClipboard}
      >
        {t('Copy to clipboard')}
      </Button>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        message={t('Copied!')}
        autoHideDuration={500}
        open={copyToClipboard}
        onClose={handleCloseSnackbar}
      />
    </div>
  )
}

/**
 * Minified row component
 * @returns JSX Element
 */
const MinifiedRow: React.FC = (): JSX.Element => {
  const minified = useAtomValue(getMinifiedAtom)
  const setMinified = useSetAtom(setMinifiedAtom)
  const { t } = useTranslation()

  const segments = new Intl.Segmenter().segment(minified)
  const strictCount = [...segments].length
  const approximateCount = countApproximateCharacters(minified)

  const handleChangeMinified = useCallback(
    (value: string) => {
      setMinified(value)
    },
    [setMinified],
  )

  return (
    <div>
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <Typography variant="h6" component="h2" sx={CSS_FLEX_GROW_1}>
          {t('Minified')}
        </Typography>
        {`${t('character count: ')}`}
        <span aria-live="polite" data-testid="strict-character-count">{`${strictCount}`}</span>
        {`${t('(strict)')}`} /{' '}
        <span
          aria-live="polite"
          data-testid="approximate-character-count"
        >{`${approximateCount}`}</span>
        {`${t('(approximate)')}`}
      </div>
      <div data-testid="minified" css={css({ height: '3rem' })}>
        <CodeEditor
          editorName={t('minified')}
          height="3.2rem"
          tabSize={INDENT_SIZE}
          code={minified}
          onChange={handleChangeMinified}
        />
      </div>
      <div
        css={css({
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1rem',
        })}
      >
        <CopyToClipboardButton />
      </div>
    </div>
  )
}

/**
 * "Edit" page component
 * @returns JSX Element
 */
export const Edit: React.FC = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom)
  const { t } = useTranslation()

  const handleChangeTab = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue)
    },
    [setTabIndex],
  )

  return (
    <App>
      <section
        css={{
          flexGrow: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          margin: '1rem 0 1.5rem',
        }}
      >
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab id={ID_TAB_CODE} label={t('Code')} aria-controls={ID_TAB_PANEL_CODE} />
          <Tab id={ID_TAB_CANVAS} label={t('Canvas')} aria-controls={ID_TAB_PANEL_CANVAS} />
        </Tabs>
        {tabIndex === 0 && <CodeTabPanel />}
        {tabIndex === 1 && <CanvasTabPanel />}
      </section>
    </App>
  )
}
