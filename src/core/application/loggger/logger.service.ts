// logger.service.ts
import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;

  constructor() {
    // Inicializamos el KafkaLogger con el broker y el tópico deseado
    this.createLoggers(); // Creamos los loggers de Winston
  }

  createLoggers() {
    const textFormat = format.combine(
      format.printf((log) => {
        return `${log.timestamp} - [${log.level.toUpperCase()}] ${log.message}`;
      }),
    );
    const dateFormat = format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    });

    // Logger para mensajes de info
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

    // Logger para mensajes de error
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

    // Logger para mensajes de advertencia
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

    // Logger para todos los mensajes
    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/all/all-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new transports.Console(), // También imprimimos en consola
      ],
    });
  }
  async log(message: string) {
    this.loggerInfo.info(message);
    this.loggerAll.info(message);
  }

  async error(message: string) {
    this.loggerError.error(message);
    this.loggerAll.error(message);
  }

  async warn(message: string) {
    this.loggerWarn.warn(message);
    this.loggerAll.warn(message);
  }

  async debug(message: string) {
    this.loggerAll.debug(message);
  }

  async verbose(message: string) {
    this.loggerAll.verbose(message);
  }
}
