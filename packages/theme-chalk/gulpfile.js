'use strict';

import { fileURLToPath } from 'url'
import { Transform } from 'stream'
import { dest, parallel, series, src } from 'gulp'

import path from 'path'
import autoprefixer from 'gulp-autoprefixer'
import postcss from 'postcss'
import cssnano from 'cssnano'

import gulpSass from 'gulp-sass'
import * as sass from 'sass'

const { dirname } = path
 
const _sass = gulpSass(sass)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          colormin: false,
          minifyFontValues: false,
        },
      ],
    }),
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk 
      if (file.isNull()) {
        callback(null, file)
        return
      }
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file ? file.contents.toString() : ''
      processor.process(cssString, { from: file.path }).then((result) => {
        file.contents = Buffer.from(result.css)
        callback(null, file)
      })
    },
  })
}

function buildCommonStyles(folder) {
  return src(path.resolve(__dirname, `src/${folder}/index.scss`))
    .pipe(_sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(dest(path.resolve(__dirname, `lib/${folder}`)))
}

function buildNormalize() {
  return buildCommonStyles('normalize')
} 

function buildLightCssVars() {
  return buildCommonStyles('light')
} 

function buildDarkCssVars() {
  return buildCommonStyles('dark')
}

export const build = parallel(series(buildNormalize, buildLightCssVars, buildDarkCssVars))

export default build