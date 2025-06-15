import { Button, Tab, Tabs, TextareaAutosize, css } from '@mui/material'
import { type JSX, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <FlexColumnContainer
      role="tabpanel"
      id={ID_TAB_PANEL_CODE}
      aria-labelledby={ID_TAB_CODE}
      css={css({ flexGrow: 1 })}
    >
      <TextareaAutosize
        aria-label={t('source code')}
        css={css({ flexGrow: 1, width: 'calc(100% - 0.5rem)' })}
      />
      <div css={css({ width: '100%', display: 'flex', gap: '1rem' })}>
        <Button variant="outlined" disabled css={CSS_FLEX_GROW_1}>
          {t('Beautify')}
        </Button>
        <Button variant="outlined" disabled css={CSS_FLEX_GROW_1}>
          {t('Minify & Run')}
        </Button>
      </div>
    </FlexColumnContainer>
  )
}

/**
 * Canvas tab panel component
 * @returns JSX Element
 */
const CanvasTabPanel: React.FC = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <FlexColumnContainer
      role="tabpanel"
      id={ID_TAB_PANEL_CANVAS}
      aria-labelledby={ID_TAB_CANVAS}
      css={css({ flexGrow: 1 })}
    >
      <FlexColumnContainer css={CSS_FLEX_GROW_1}>
        <iframe title="canvas" css={css({ flexGrow: 1, width: 'calc(100% - 0.5rem)' })} />
        <Button variant="outlined" disabled css={css({ width: '100%' })}>
          {t('Stop')}
        </Button>
      </FlexColumnContainer>
    </FlexColumnContainer>
  )
}

/**
 * "Edit" page component
 * @returns JSX Element
 */
export const Edit: React.FC = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0)
  const { t } = useTranslation()

  const handleChangeTab = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }, [])

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
        <div>
          <TextareaAutosize
            aria-label={t('minified code')}
            minRows={4}
            css={css({ width: 'calc(100% - 0.5rem)' })}
          />
          <div css={css({ display: 'flex', justifyContent: 'flex-end' })}>{t('0 characters')}</div>
        </div>
      </section>
    </App>
  )
}
