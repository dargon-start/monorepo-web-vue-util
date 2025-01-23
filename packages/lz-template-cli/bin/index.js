const { Command } = require("commander");

const chalk = require("chalk");
const figlet = require("figlet");

const program = new Command();

console.log("====================================");
console.log("🚀 lz-template-cli v1.0.0");
console.log("====================================");

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((projectName, cmd) => {
    require("../lib/init.js")(projectName, cmd);
  });

program.on("--help", function () {
  console.log(
    "\r\n" +
      figlet.textSync("lz-template-cli", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
      })
  );
});

program.parse();
