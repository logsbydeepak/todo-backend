import { createLogger, transports, format } from "winston";
import "winston-mongodb";

import { DB_LOG_URL, NODE_ENV } from "./env.config";

const { combine, timestamp, printf, colorize } = format;

export const logger = createLogger({
  level: "info",
  transports: [
    new transports.MongoDB({
      db: DB_LOG_URL as string,
      collection: "logs",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

const timeZone = () => new Date().toLocaleString();

const consoleFormat = printf(
  ({ timestamp, level, message }) => `[${level}] [${timestamp}] ${message}`
);

if (NODE_ENV !== "prod") {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: timeZone }),
        consoleFormat
      ),
    })
  );
}
