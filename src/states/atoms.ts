import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

/**
 * Verbose code atom
 */
export const verboseCodeAtom = atomWithStorage(
  'verboseCode',
  `t = 0;
draw= _ => {
  (t || (createCanvas(W = 720, W), noFill(H = W / 2), colorMode(HSB, 1, 1, 1, 1)))
  blendMode(NORMAL);
  background(0);
  blendMode(ADD);
  translate(H, H);
  for (j = .0; j < 1; j += 0.01) {
    push();
    stroke(noise(j, t), 0.6, 1, 0.5);
    rotate(noise(t, j) * PI);
    ellipse(0, 0, W, W * 1.618 * sin(j));
    pop();
  }
  t += .001;
}`,
)

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
export const minifiedAtom = atomWithStorage('minified', '')

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

/**
 * Tab index atom
 */
export const tabIndexAtom = atom(0)
