'use strict'

const ora = require('ora')

function sleep(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}

async function loading(message, fn, ...args) {
  const spinner = ora(message)
  spinner.start()
  try {
    const executeRes = await fn(...args)
    spinner.succeed()
    return executeRes
  } catch (error) {
    spinner.fail('request fail, re trying')
    await sleep(1000)
    return loading(message, fn, ...args)
  }
}

function shouldUseYarn () {
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

function shouldUseCnpm () {
  try {
    execSync('cnpm --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  loading,
  shouldUseYarn,
  shouldUseCnpm,
}