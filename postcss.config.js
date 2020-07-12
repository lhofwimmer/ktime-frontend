const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.svelte', './src/**/*.html'],
  whitelistPatterns: [/svelte-/],

  // This is the function used to extract class names from your templates
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(!process.env.ROLLUP_WATCH ? [purgecss] : [])
  ]
}