# 官方说明
[bin](https://docs.npmjs.com/files/package.json#bin)

## 一个简单的例子
```json
  { "bin" : { "myapp" : "./cli.js" } }
```

用户执行`myapp`就会调用该包内的`./cli.js`文件

## 更简单的用法
如果一个包只有一个命令，可以直接写
```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "./path/to/program"
}
```
用户执行`my-program`就会调用该包内的`./path/to/program`文件夹

# 自己写一个
`Please make sure that your file(s) referenced in bin starts with #!/usr/bin/env node, otherwise the scripts are started without the node executable!`
- 官方提示，写的文件头部得加`#!/usr/bin/env node`,用于动态检测出不同用户各自的 node 路径并执行

## 一个简单的命令

新建一个本地仓库
```bash
mkdir webpack-bin-demo
cd webpack-bin-demo
npm init -y
mkdir bin
```

新建一个简单的脚本`bin/index.js`

```js
#!/usr/bin/env node
// 获取命令的参数
const args = process.argv.slice(2)
console.log(args)
```

加入`package.json`

```json
"bin": "./bin/index.js",
```

执行`npm link`链接本地仓库

测试下刚写的命令
```bash
webpack-bin-demo
// []
webpack-bin-demo aaa
// [ 'aaa' ]
```

假设我们只需要一个参数，并且先加1个万能的`help`
```js
#!/usr/bin/env node
// 获取命令的参数
const args = process.argv.slice(2)

const help = `
Command
============================
help: show help
============================
`

if (args.length) {
  const arg = args[0]
  switch (arg) {
    case '-h':
    case 'help':
      console.error(help)
      process.exitCode = 1
      break
    default:
      console.log('Bad command parameters！Run help to get help')
      process.exitCode = 1
  }
} else {
  console.log('Missing command parameters！Run help to get help')
  process.exitCode = 1
}
```

然后看看成果

```bash
webpack-bin-demo help

Command
============================
help: show help
============================
```

## 加入一些命令
加入一些`webpack`的常用命令

### child_process (子进程)
- child_process 模块提供了衍生子进程的功能

- 默认情况下，在 Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。 数据能以非阻塞的方式在管道中流通。 注意，有些程序会在内部使用行缓冲 I/O。 虽然这并不影响 Node.js，但这意味着发送到子进程的数据可能无法被立即使用。

- child_process.spawn() 方法会异步地衍生子进程，且不会阻塞 Node.js 事件循环。 child_process.spawnSync() 方法则以同步的方式提供同样的功能，但会阻塞事件循环，直到衍生的子进程退出或终止。

先看下`webpack`的写法,用到了`spawn`，配合`Promise`使用
```js
#!/usr/bin/env node

function runCommand(command, options) {
  const cp = require("child_process");
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, options, {
      stdio: "inherit",
      shell: true
    });

    executedCommand.on("error", error => {
      reject(error);
    });

    executedCommand.on("exit", code => {
      if (code === 0) {
        resolve(true);
      } else {
        reject();
      }
    });
  });
}
```

直接用`spawnSync`
```js
const { spawnSync } = require('child_process')
function runCommand(command, options) {
  spawnSync(command, options, {
    stdio: 'inherit',
    shell: true,
  })
}
```

### 使用`spawnSync`编写一些简单的命令

```js
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

```


### 在其他项目中使用
请配合[webpack-demo](https://github.com/babytutu/webpack-demo)体验

修改`package.json`中的`scripts`

```json
  "scripts": {
    "start": "webpack-bin-demo start",
    "lint-fix": "webpack-bin-demo fix",
    "dll": "webpack-bin-demo dll",
    "build": "webpack-bin-demo build",
  }
```