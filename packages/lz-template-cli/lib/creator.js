class Creator {
  constructor(destPath, projectName) {
    this.destPath = destPath;
    this.projectName = projectName;
    this.prompts = [];
    this.config = {};
  }

  async create(destPath, projectName) {
    await this.ask();
    await this.create();
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
  }

  async askTemplate() {}

  async askTypeScript() {}

  async askDescription() {}

  async askAuthorInfo() {}

  async askVersion() {}
}

module.exports = Creator;
