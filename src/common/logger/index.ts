import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';
const { combine, timestamp, printf, colorize } = winston.format;

const logger = winston.createLogger({
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});

export class Logger extends ConsoleLogger {
  log(message: string) {
    logger.info(message);
  }

  error(message: string) {
    logger.error(message);
  }

  warn(message: string) {
    logger.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
  }
}
