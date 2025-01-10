'use strict'

const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const chalk = require('chalk')

const { TS_IGNORE_FILE, EJS_IGNORE_FILE } = require('../config')

function createFile(projectName, config, templatePath, destPath, item) {
  const type = config.template
  const tsIgnoreFile = TS_IGNORE_FILE[type] || []
  const esjIgnoreFile = EJS_IGNORE_FILE[type] || []
  if (!config.typescript && tsIgnoreFile.includes(item)) {
    return
  } else {
    fs.copyFileSync(templatePath, destPath)
  }
  
  if (!esjIgnoreFile.includes(item)) {
    ejs.renderFile(destPath, { ...config, projectName }, (err, result) => {
      if (err) {
        console.log(templatePath)
        console.log(err)
        fs.removeSync(templatePath)
        process.exit(1)
      }
      fs.writeFileSync(destPath, result)
    })
  }

  return `${chalk.green('✔ ')}${chalk.grey(`create: ${destPath}`)}`
}

function generatorFile(projectName, tempFilePath, config, destPath, cb) {
  const logs = []

  fs.mkdirSync(destPath)

  const map = (src, dest) => {
    const dirs = fs.readdirSync(src)
    dirs.forEach(async (item) => {
      const curPath = path.join(src, item)
      const curDestPath = path.join(dest, item)
      const temp = fs.statSync(curPath)

      if (temp.isFile()) {
        const log = createFile(projectName, config, curPath, curDestPath, item)
        log && logs.push(log)
      } else if (temp.isDirectory()) {
        fs.mkdirSync(curDestPath)
        map(curPath, curDestPath)
      }
    })
  }
  map(tempFilePath, destPath)
  cb && cb(logs)
}

module.exports = {
  generatorFile,
}