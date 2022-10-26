import chalk from "chalk";

export default {
  ok(message: string): void {
    console.log(chalk.bold.green(message));
  },

  error(message: string): void {
    console.log(chalk.bold.red(message));
  },

  warning(message: string): void {
    console.log(chalk.bold.white.bgRedBright("\n", message, "\n"));
  },
};
