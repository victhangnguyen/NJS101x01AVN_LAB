import chalk from 'chalk';

export default class Logging {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? chalk.blueBright(args) : args
    );
  public static infoAsync = (args: any, callbackFn: () => void) => {
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? chalk.blueBright(args) : args
    );
    callbackFn()
  };
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
      typeof args === 'string' ? chalk.yellowBright(args) : args
    );
  public static error = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
      typeof args === 'string' ? chalk.redBright(args) : args
    );
  public static shop = (args: any) =>
    console.log(
      chalk.green(`[${new Date().toLocaleString()}] [SHOP]`),
      typeof args === 'string' ? chalk.greenBright(args) : args
    );
  public static admin = (args: any) =>
    console.log(
      chalk.cyan(`[${new Date().toLocaleString()}] [ADMIN]`),
      typeof args === 'string' ? chalk.cyanBright(args) : args
    );
}
