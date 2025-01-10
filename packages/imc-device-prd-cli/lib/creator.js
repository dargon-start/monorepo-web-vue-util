'use strict'

const fs = require('fs-extra')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const { exec } = require('child_process')

const userEmail = require('./vendor')()
const { fetchTemplate } = require('./fetch-template')
const { generatorFile } = require('./generator')
const { shouldUseYarn, shouldUseCnpm } = require('./util')

class Creator {
  constructor(destPath, projectName) {
    this.destPath = destPath
    this.projectName = projectName
    this.prompts = []
    this.config = {}
  }

  async create() {
    try {
      await this.ask()
      const res = await fetchTemplate(this.config, this.destPath, this.projectName)
      res && this.generatorFile(res)
    } catch(error) {
      console.log(chalk.red('创建项目失败: ', error))
    }
  }

  async ask() {
    this.askTemplate()
    // this.askCss()
    this.askTypeScript()
    this.askDescription()
    this.askAuthorInfo()
    this.askVersion()

    const answers = await inquirer.prompt(this.prompts)
    
    this.config = { ...answers }
  }

  askTemplate() {
    this.prompts.push({
      type: 'list',
      name: 'template',
      message: '请选择下载的模板',
      choices: ['vue2-webpack-template', 'vue2-vite-template'],
      default: 'vue2-webpack-template',
    })
  }

  askCss() {
    this.prompts.push({
      type: 'list',
      name: 'css',
      message: '请选择所使用的css预处理器',
      choices: ['scss', 'less'],
      default: 'scss',
    })
  }

  askTypeScript() {
    this.prompts.push({
      type: 'confirm',
      name: 'typescript',
      message: '是否使用TypeScript',
      default: true,
    })
  }

  askDescription() {
    this.prompts.push({
      type: 'input',
      name: 'description',
      message: '请输入项目介绍',
    })
  }

  askAuthorInfo() {
    this.prompts.push({
      type: 'input',
      name: 'author',
      message: '请输入作者信息',
      default: `${userEmail}`,
    })
  }

  askVersion() {
    this.prompts.push({
      type: 'input',
      name: 'version',
      message: '请输入项目版本号',
      default: '0.0.1'
    })
  }

  generatorFile(tempPath) {
    generatorFile(this.projectName, tempPath, this.config, this.destPath, (logs) => {
      console.log(`${chalk.green('✔ ')}${chalk.grey(`create: ${chalk.grey.bold(this.projectName)}`)}`)
      logs.forEach(log => console.log(log))
      console.log()
      fs.removeSync(tempPath)

      this.initProject()
    })
  }

  async initProject() {
    process.chdir(this.destPath)

    await this.gitInit()
    await this.installDenpendence()
    
    this.confirmInfo()

  }

  gitInit() {
    return new Promise((resolve) => {
      const gitInitSpinner = ora(`cd ${chalk.cyan.bold.green(this.projectName)}, exec ${chalk.cyan.bold.green('git init')}`).start()
      const gitInit = exec('git init')
      gitInit.on('close', (code) => {
        if (code === 0) {
          gitInitSpinner.color = 'green'
          gitInitSpinner.succeed(gitInit.stderr.read())
        } else {
          gitInitSpinner.color = 'red'
          gitInitSpinner.fail(gitInit.stderr.read())
        }
        console.log()
        resolve()
      })
    })
  }

  installDenpendence () {
    return new Promise((resolve) => {
      let command = 'npm install'
      if (shouldUseYarn()) {
        command = 'yarn install'
      } else if (shouldUseCnpm()) {
        command = 'cnpm install'
      }
      const installSpinner = ora(`🚀 ${chalk.cyan.bold.green(command)}`).start()
      exec(command, (error, stdout, stderr) => {
        if (error) {
          installSpinner.color = 'red'
          installSpinner.fail(chalk.red(`${command} failed, please try again a later!`))
          console.log(error)
          this.installRes = false
        } else {
          installSpinner.color = 'green'
          installSpinner.succeed(chalk.green(`${command}!`))
          console.log(`${stderr}${stdout}`)
          this.installRes = true
        }
        resolve()
      })
    })
  }

  confirmInfo() {
    if (this.installRes) {
      console.log(chalk.green(`📚 finished!`))
      console.log(chalk.green(`📚 let's go to work! 😝`))
    }
  }
}

module.exports = Creator