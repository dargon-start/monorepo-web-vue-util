"use strict";

const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");
const path = require("path");

const Creator = require("./creator");

const { loading } = require("./util");

module.exports = async (projectName, option) => {
  // 获取当前目录
  const targetDirectory = path.join(process.cwd(), projectName);

  // 项目目录存在
  if (fs.existsSync(targetDirectory)) {
    if (option.force) {
      await fs.remove(targetDirectory);
    } else {
      const { isOverwrite } = await inquirer.prompt([
        {
          name: "isOverwrite",
          type: "list",
          message: "target directory exists, please choose an action",
          choices: [
            { name: "overwrite", value: true },
            { name: "cancel", value: false },
          ],
        },
      ]);

      if (!isOverwrite) {
        console.log("cancel");
        return;
      }

      // 清除旧项目
      await loading(
        chalk.green(`removing ${projectName}`),
        fs.remove,
        targetDirectory
      );
    }
  }

  // 创建项目
  const creator = new Creator(targetDirectory, projectName);

  await creator.create();
};
