import winston, { format, Logger, transports } from "winston";

import { config } from "../config";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const createLogger = (loggerName: string): Logger =>
  winston.createLogger({
    level: config.env === "development" ? "debug" : "info",
    format: format.combine(
      enumerateErrorFormat(),
      config.env === "development" ? format.colorize() : format.uncolorize(),
      format.timestamp(),
      format.printf(
        ({ level, message, timestamp }) =>
          `${timestamp} ${loggerName} [${level}]  - ${message}`
      )
    ),
    transports: [
      new transports.Console({
        stderrLevels: ["error"],
      }),
    ],
  });

export { createLogger };
