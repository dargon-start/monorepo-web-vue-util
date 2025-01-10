'use strict'

const os = require('os')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const download = require('download-git-repo')

const { REMOTE_URL } = require('../config')

async function fetchTemplate(config, destPath, projectName) {
  const {
    template
  } = config
  const remoteUrl = REMOTE_URL[template]
  const tempPath = `${os.tmpdir()}/${projectName}`

  return new Promise((resolve) => {
    const spinner = ora('downloading...').start()

    if (fs.existsSync(destPath)) fs.removeSync(destPath)
    if (fs.existsSync(tempPath)) fs.removeSync(tempPath)

    download(remoteUrl, tempPath, { clone: true }, (err) => {
      if (err) {
        console.log(err)
        spinner.color = 'red'
        spinner.fail(chalk.red('download repository failed!'))
        resolve(false)
        return
      }
      spinner.color = 'green'
      spinner.succeed(`${chalk.gray('download repository success!')}`)
      resolve(tempPath)
    })
  })
}

module.exports = {
  fetchTemplate,
}