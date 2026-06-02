import { defineConfig } from "@pandacss/dev";
import { textStyles } from './src/styles/text-styles'
import { keyframes } from './src/styles/keyframes'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}', './pages/**/*.{ts,tsx,js,jsx,astro}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      keyframes,
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1921px',
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  // emitPackage:true,
  // optimize:true,
  hooks: {
    'config:resolved': () => {
      console.log('🐼 Panda CSS config resolved for ISR mode')
    }
  }
});
