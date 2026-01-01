"use strict";

const { execSync } = require("child_process");
const chalk = require("chalk");
const pkg = require("../package.json");
const { loading } = require("./util");

/**
 * Update the CLI to the latest version
 */
module.exports = async function update() {
  const checkUpdate = require("./checkUpdate");
  const latestVersion = await checkUpdate();

  if (!latestVersion) {
    console.log(chalk.green("✨ You are already using the latest version."));
    return;
  }

  console.log(
    chalk.yellow(`🚀 New version available: ${latestVersion}. Updating...`)
  );

  try {
    await loading(
      chalk.green("Updating lz-template-cli..."),
      async () => {
        execSync(`npm install -g ${pkg.name}@latest`, { stdio: "inherit" });
      }
    );
    console.log(chalk.green("✅ Update successful!"));
  } catch (error) {
    console.error(chalk.red("❌ Update failed. Please try running manually:"));
    console.error(chalk.cyan(`   npm install -g ${pkg.name}@latest`));
  }
};
