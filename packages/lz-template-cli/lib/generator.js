const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

function createFile(projectName, config, templatePath, destPath, item) {
  const type = config.template;

  // 复制文件
  fs.copyFileSync(templatePath, destPath);

  return `${chalk.green("✔ ")}${chalk.grey(`create: ${destPath}`)}`;
}

function generatorFile(projectName, tempFilePath, config, destPath, cb) {
  const logs = [];

  fs.mkdirSync(destPath);

  // 复制模版项目到目标目录
  const map = (src, dest) => {
    const dirs = fs.readdirSync(src);
    dirs.forEach(async (item) => {
      const curPath = path.join(src, item);
      const curDestPath = path.join(dest, item);
      const temp = fs.statSync(curPath);

      if (temp.isFile()) {
        const log = createFile(projectName, config, curPath, curDestPath, item);
        log && logs.push(log);
      } else if (temp.isDirectory()) {
        fs.mkdirSync(curDestPath);
        map(curPath, curDestPath);
      }
    });
  };
  map(tempFilePath, destPath);
  cb && cb(logs);
}

module.exports = {
  generatorFile,
};
