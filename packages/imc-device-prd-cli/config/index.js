'use strict'

// 模版地址
const REMOTE_URL = {
  'vue2-webpack-template': 'direct:https://git.cisdigital.cn/ds-device/imc-device-prd/imc-devcie-prd-vue2-webpack-template.git',
  'vue2-vite-template': 'direct:https://git.cisdigital.cn/ds-device/imc-device-prd/imc-devcie-prd-vue2-vite-template.git'
}

// 选择不使用ts时，对应模版应该忽略生成的文件
const TS_IGNORE_FILE = {
  'vue2-webpack-template': ['lodash.d.ts', 'shims-tsvue.d.ts', 'shims-tsx.d.ts', 'shims-vue.d.ts', 'tsconfig.json'],
  'vue2-vite-template': ['lodash.d.ts', 'shims-tsvue.d.ts', 'shims-tsx.d.ts', 'shims-vue.d.ts', 'tsconfig.json'],
}

// ejs跳过渲染的文件
const EJS_IGNORE_FILE = {
  'vue2-webpack-template': ['index.html', 'PingFang-Jian-ChangGuiTi-2.ttf'],
  'vue2-vite-template': ['PingFang-Jian-ChangGuiTi-2.ttf'],
}

module.exports = {
  REMOTE_URL,
  TS_IGNORE_FILE,
  EJS_IGNORE_FILE,
}