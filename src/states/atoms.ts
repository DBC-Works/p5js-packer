import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

/**
 * Verbose code atom
 */
const verboseCodeAtom = atomWithStorage('verboseCode', '')

/**
 * Has verbose code read-only atom
 */
export const hasVerboseCodeAtom = atom((get) => 0 < get(verboseCodeAtom).length)

/**
 * Get verbose code read-only atom
 */
export const getVerboseCodeAtom = atom((get) => get(verboseCodeAtom))

/**
 * Set verbose code write-only atom
 */
export const setVerboseCodeAtom = atom(null, (_, set, code: string) => {
  set(verboseCodeAtom, code)
})

/**
 * Minified atom
 */
const minifiedAtom = atomWithStorage('minified', '')

/**
 * Get minified read-only atom
 */
export const getMinifiedAtom = atom((get) => get(minifiedAtom))

/**
 * Set minified write-only atom
 */
export const setMinifiedAtom = atom(null, (_, set, minified: string) => {
  set(minifiedAtom, minified)
})
