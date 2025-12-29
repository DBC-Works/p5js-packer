/**
 * Generates a CDN URL for a specific version of p5.js.
 * @param version p5.js version
 * @returns The CDN URL for the specified p5.js version
 */
export const makeP5jsCdnUrl = (version: string): string =>
  `https://cdn.jsdelivr.net/npm/p5@${version}/lib/p5.min.js`
