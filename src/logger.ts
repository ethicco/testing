import fs from "node:fs";
import config from "./config";

const logger = {
  log: (msg: string) => fs.appendFileSync(config.logsPath, msg + "\n"),
};

export default logger;
