"use strict";

const os = require("os");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs-extra");
const download = require("download-git-repo");
const { execSync } = require("child_process");

const { REMOTE_URL } = require("../config");

async function fetchTemplate(config, destPath, projectName) {
  const { template } = config;
  const remoteUrl = REMOTE_URL[template];
  const tempPath = `${os.tmpdir()}/${projectName}`;

  return new Promise((resolve) => {
    const spinner = ora("downloading...").start();

    if (fs.existsSync(destPath)) fs.removeSync(destPath);
    if (fs.existsSync(tempPath)) fs.removeSync(tempPath);

    download(remoteUrl, tempPath, {}, (err) => {
      if (err) {
        console.log(err);
        spinner.color = "red";
        spinner.fail(chalk.red("download repository failed!"));
        resolve(false);
        return;
      }
      // try {
      //   // 启用 sparse-checkout
      //   execSync("git sparse-checkout init --cone", { cwd: tempPath });
      //   execSync("git sparse-checkout set packages/vue-template", {
      //     cwd: tempPath,
      //   });
      // } catch (error) {
      //   console.error("操作失败:", err);
      // }
      spinner.color = "green";
      spinner.succeed(`${chalk.gray("download repository success!")}`);
      console.log(tempPath, "tempPath");

      // 返回模版路径
      resolve(`${tempPath}/packages/vue-template`);
    });
  });
}

module.exports = {
  fetchTemplate,
};
