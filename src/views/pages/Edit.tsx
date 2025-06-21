import { Button, Tab, Tabs, TextareaAutosize, css } from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import beautify from 'js-beautify'
import { type ChangeEvent, type JSX, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { minify } from 'terser'

import {
  getMinifiedAtom,
  getVerboseCodeAtom,
  setMinifiedAtom,
  setVerboseCodeAtom,
  tabIndexAtom,
} from '../../states/atoms'
import { App } from '../templates/App'
import { FlexColumnContainer } from '../templates/FlexColumnContainer'

const ID_TAB_CODE = 'code-tab'
const ID_TAB_CANVAS = 'canvas-tab'
const ID_TAB_PANEL_CODE = 'code-tab-panel'
const ID_TAB_PANEL_CANVAS = 'canvas-tab-panel'

const CSS_FLEX_GROW_1 = css({ flexGrow: 1 })

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
    (e: ChangeEvent<globalThis.HTMLTextAreaElement>) => {
      setVerboseCode(e.target?.value)
    },
    [setVerboseCode],
  )

  const handleClickBeautify = useCallback(async () => {
    setVerboseCode(await beautify(minified))
  }, [minified, setVerboseCode])
  const handleClickRun = useCallback(async () => {
    try {
      const { code } = await minify(verboseCode)
      setMinified(`${code}// #つぶやきProcessing`)
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
      css={css({ flexGrow: 1 })}
    >
      <TextareaAutosize
        aria-label={t('verbose code')}
        css={css({ flexGrow: 1, width: 'calc(100% - 0.5rem)' })}
        value={verboseCode}
        onChange={handleChangeCode}
      />
      <div css={css({ width: '100%', display: 'flex', gap: '1rem' })}>
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
      css={css({ flexGrow: 1 })}
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
 * Minified row component
 * @returns JSX Element
 */
const MinifiedRow: React.FC = (): JSX.Element => {
  const minified = useAtomValue(getMinifiedAtom)
  const setMinified = useSetAtom(setMinifiedAtom)
  const { t } = useTranslation()

  const segments = new Intl.Segmenter().segment(minified)
  const length = [...segments].length

  const handleChangeMinified = useCallback(
    (e: ChangeEvent<globalThis.HTMLTextAreaElement>) => {
      setMinified(e.target?.value)
    },
    [setMinified],
  )

  return (
    <div>
      <TextareaAutosize
        aria-label={t('minified')}
        minRows={4}
        css={css({ width: 'calc(100% - 0.5rem)' })}
        value={minified}
        onChange={handleChangeMinified}
      />
      <div css={css({ display: 'flex', justifyContent: 'flex-end' })}>
        {`${t('character count: ')}`}
        <span aria-live="polite">{`${length}`}</span>
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
          margin: '1rem 0',
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
