import winston from "winston";

export function getLogger(): winston.Logger {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
      service: "get-lol-skin",
    },
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });
  if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console());
  }
  return logger;
}
