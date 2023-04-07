const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --ignore-path .eslintignore --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const buildEslintCommandOthers = (filenames) =>
  `npx prettier --ignore-path ./.prettierignore --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '**/*.ts?(x)': () => 'npx tsc -p tsconfig.json --noEmit',
  '*.{ts,tsx}': [buildEslintCommand],
  '*.{json}': [buildEslintCommandOthers],
}