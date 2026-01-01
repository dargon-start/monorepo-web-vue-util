"use strict";

const axios = require("axios");
const pkg = require("../package.json");
const chalk = require("chalk");

/**
 * Check if there is an update available for the CLI
 * @returns {Promise<string|null>} Returns the latest version if update available, else null
 */
module.exports = async function checkUpdate() {
  try {
    const { data } = await axios.get(
      `https://registry.npmjs.org/${pkg.name}`,
      { timeout: 3000 }
    );
    const latestVersion = data["dist-tags"].latest;
    const currentVersion = pkg.version;

    if (latestVersion !== currentVersion) {
      return latestVersion;
    }
    return null;
  } catch (error) {
    // If check fails, we don't want to block the user
    return null;
  }
};


module.exports.checkVersion = async function checkVersion() {
  const checkUpdate = require("../lib/checkUpdate");
  try {
    const latestVersion = await checkUpdate();
    
    if (latestVersion) {
      console.log(
        chalk.yellow(
          `\r\n✨ A new version of lz-template-cli is available: ${latestVersion}`
        )
      );
      console.log(chalk.cyan(`👉 Run 'lz-template-cli update' to update\r\n`));
    }
  } catch (e) {
    // ignore
  }
}