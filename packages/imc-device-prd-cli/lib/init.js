'use strict'

const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require('path')
const Creator = require('./creator')

const { loading } = require('./util')

module.exports = async function (projectName, options) {

  // 获取当前目录
  const targetDirectory = path.join(process.cwd(), projectName)

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      await fs.remove(targetDirectory)
    } else {
      const { isOverwrite } = await inquirer.prompt([
        {
          name: 'isOverwrite',
          type: 'list', 
          message: 'target directory exists, please choose an action',
          choices: [
            { name: 'overwrite', value: true },
            { name: 'cancel', value: false },
          ],
        },
      ])
      if (!isOverwrite) {
        console.log('cancel')
        return
      }
      await loading(
        chalk.green(`removing ${projectName}`),
        fs.remove,
        targetDirectory,
      )
    }
  }

  // 创建项目
  const creator = new Creator(targetDirectory, projectName)

  creator.create()
}