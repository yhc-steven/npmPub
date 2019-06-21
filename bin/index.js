#!/usr/bin/env node
const { spawnSync } = require('child_process')

const commands = {
  start: 'npm run dll && webpack-dev-server --config webpack/webpack.dev.js',
  fix: 'eslint src --ext .js,.vue --fix',
  dll: 'webpack --config webpack/webpack.dll.js',
  build: 'npm run dll && webpack --config webpack/webpack.prod.js',
  help: 'help',
}

const runCommand = (command, options = []) => {
  if (command === 'help') {
    console.log('Commands List')
    console.log('--------------------------------------------------------------------------------------------')
    Object.keys(commands).map(key => console.log(key.padEnd(6), ':', commands[key]))
    console.log('--------------------------------------------------------------------------------------------')

    process.exit(0)
  }
  if (command) {
    spawnSync(command, options, {
      stdio: 'inherit',
      shell: true,
    })
    process.exit(0)
  } else {
    console.log('Bad command parameters！Run help to get help')
    process.exitCode = 1
  }
}

// 获取命令的参数
const args = process.argv.slice(2)

if (args.length) {
  runCommand(commands[args[0]])
} else {
  console.log('Missing command parameters！Run help to get help')
  process.exitCode = 1
}