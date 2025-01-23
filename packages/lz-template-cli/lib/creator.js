const ora = require("ora");
const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { exec } = require("child_process");

const { fetchTemplate } = require("./fetch-template");
const { generatorFile } = require("./generator");
const { shouldUseYarn, shouldUseCnpm, shouldUseNpm } = require("./util");
const userEmail = require("./vendor")();

class Creator {
  constructor(destPath, projectName) {
    this.destPath = destPath;
    this.projectName = projectName;
    this.prompts = [];
    this.config = {};
  }

  async create(destPath, projectName) {
    try {
      await this.ask();
      const res = await fetchTemplate(
        this.config,
        this.destPath,
        this.projectName
      );
      res && this.generatorFile(res);
    } catch (error) {
      console.log(chalk.red("创建项目失败: ", error));
    }
  }

  async ask() {
    // 选择模版
    this.askTemplate();
    // 是否使用typescript
    this.askTypeScript();
    // 请输入项目描述
    this.askDescription();
    // 请输入作者信息
    this.askAuthorInfo();
    // 请输入项目版本号
    this.askVersion();

    const answers = await inquirer.prompt(this.prompts);

    this.config = { ...answers };

    console.log(this.config, "config");
  }

  async askTemplate() {
    this.prompts.push({
      type: "list",
      name: "template",
      message: "请选择下载的模板",
      choices: ["vue3-vite-template"],
      default: "vue3-vite-template",
    });
  }

  async askTypeScript() {
    this.prompts.push({
      type: "confirm",
      name: "typescript",
      message: "是否使用TypeScript",
      default: true,
    });
  }

  async askDescription() {
    this.prompts.push({
      type: "input",
      name: "description",
      message: "请输入项目介绍",
    });
  }

  async askAuthorInfo() {
    this.prompts.push({
      type: "input",
      name: "author",
      message: "请输入作者信息",
      default: `${userEmail}`,
    });
  }

  async askVersion() {
    this.prompts.push({
      type: "input",
      name: "version",
      message: "请输入项目版本号",
      default: "0.0.1",
    });
  }

  async generatorFile(tempPath) {
    generatorFile(
      this.projectName,
      tempPath,
      this.config,
      this.destPath,
      (logs) => {
        console.log(
          `${chalk.green("✔ ")}${chalk.grey(
            `create: ${chalk.grey.bold(this.projectName)}`
          )}`
        );
        logs.forEach((log) => console.log(log));
        console.log();
        fs.removeSync(tempPath);

        this.initProject();
      }
    );
  }

  async initProject() {
    // 切换到项目目录
    process.chdir(this.destPath);

    await this.gitInit();
    await this.installDenpendence();

    this.confirmInfo();
  }

  async gitInit() {
    return new Promise((resolve) => {
      // 切换到项目目录，执行git init
      const gitInitSpinner = ora(
        `cd ${chalk.cyan.bold.green(
          this.projectName
        )}, exec ${chalk.cyan.bold.green("git init")}`
      ).start();
      const gitInit = exec("git init");
      gitInit.on("close", (code) => {
        if (code === 0) {
          gitInitSpinner.color = "green";
          gitInitSpinner.succeed(gitInit.stderr.read());
        } else {
          gitInitSpinner.color = "red";
          gitInitSpinner.fail(gitInit.stderr.read());
        }
        console.log();
        resolve();
      });
    });
  }

  async installDenpendence() {
    return new Promise((resolve) => {
      let command = "pnpm install";
      if (shouldUseNpm()) {
        command = "npm install";
      } else if (shouldUseYarn()) {
        command = "yarn install";
      } else if (shouldUseCnpm()) {
        command = "cnpm install";
      }
      const installSpinner = ora(
        `🚀 ${chalk.cyan.bold.green(command)}`
      ).start();
      exec(command, (error, stdout, stderr) => {
        if (error) {
          installSpinner.color = "red";
          installSpinner.fail(
            chalk.red(`${command} failed, please try again a later!`)
          );
          console.log(error);
          this.installRes = false;
        } else {
          installSpinner.color = "green";
          installSpinner.succeed(chalk.green(`${command}!`));
          console.log(`${stderr}${stdout}`);
          this.installRes = true;
        }
        resolve();
      });
    });
  }

  confirmInfo() {
    if (this.installRes) {
      console.log(chalk.green(`📚 finished!`));
      console.log(chalk.green(`📚 let's go to work! 😝`));
    }
  }
}

module.exports = Creator;
