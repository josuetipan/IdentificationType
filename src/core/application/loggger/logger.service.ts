import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'winston-daily-rotate-file';
//Creacion del servicio de logger
@Injectable()
export class LoggerService {
  //Creacion de loggers para la creacion de loggers
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;
  //Instanciar la creacion de loggers
  constructor() {
    this.createLoggers();
  }

  createLoggers() {
    //Creacion del logger INFO
    const textFormat = format.printf((log) => {
      return `${log.timestamp} - [${log.level}] ${log.message}`;
    });
    const dateFormat = format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    });
    this.loggerInfo = createLogger({
      level: 'info',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/error/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
    this.loggerWarn = createLogger({
      level: 'warn',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/warn/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/all/all-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new transports.Console(),
      ],
    });
  }

  log(message: string) {
    this.loggerInfo.info(message);
    this.loggerAll.info(message);
  }
  error(message: string) {
    this.loggerError.error(message);
    this.loggerAll.error(message);
  }
  warn(message: string) {
    this.loggerWarn.warn(message);
    this.loggerAll.warn(message);
  }
  debug(message: string) {
    this.loggerAll.debug(message);
  }
  verbose(message: string) {
    this.loggerAll.verbose(message);
  }
}
