import chalk from "chalk";

export function log(msg) {
  console.log(`${msg}\n`);
}

export function error(msg) {
  console.log(`${chalk.bgRed.inverse("⚠️ Error:")}\n${chalk.red(msg)}\n`);
}
