#! /usr/bin/env node

const { Command } = require('commander')

const chalk = require('chalk')
const figlet = require('figlet')

const program = new Command()

program
  .description('set up a project by running one command.')
  .version(`${chalk.green(require('../package.json').version)}`)
  

program
  .command('create <project-name>') 
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((projectName, cmd) => {
    require('../lib/init')(projectName, cmd)
  })

program.on('--help', function () {
  console.log(
    '\r\n' +
      figlet.textSync('prd-cli', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      })
  )
  console.log()
  console.log(
    `run ${chalk.green.bold(
      'imc-device-prd-cli <command> --help'
    )} for detailed usage of given command.`
  )
  console.log()
})

program.parse()
