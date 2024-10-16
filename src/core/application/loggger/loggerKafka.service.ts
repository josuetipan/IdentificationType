// logger.service.ts
import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { KafkaLogger } from 'kafka-logger-mm'; // Importamos la librería de Kafka

@Injectable()
export class LoggerKafkaService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerAll: Logger;
  private kafkaLogger: KafkaLogger;

  constructor() {
    // Inicializamos el KafkaLogger con el broker y el tópico deseado
    this.kafkaLogger = new KafkaLogger(['localhost:9092'], 'example');
    this.kafkaLogger.connect(); // Conectamos a Kafka
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
  messageFormat(message: string, level: string) {
    function formatDate() {
      const date = new Date();
  
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
      const day = String(date.getDate()).padStart(2, '0');
  
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
  
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
    return `${formatDate()} - [${level.toUpperCase()}] ${message}`
  }
  async log(message: string) {
    this.loggerInfo.info(message);
    this.loggerAll.info(message);
    await this.kafkaLogger.logMessage('info', this.messageFormat(message, "INFO")); // Log en Kafka
  }

  async error(message: string) {
    this.loggerError.error(message);
    this.loggerAll.error(message);
    await this.kafkaLogger.logMessage('error', this.messageFormat(message, "ERROR")); // Log en Kafka
  }

  async warn(message: string) {
    this.loggerWarn.warn(message);
    this.loggerAll.warn(message);
    await this.kafkaLogger.logMessage('warn', this.messageFormat(message, "WARN")); // Log en Kafka
  }

  async debug(message: string) {
    this.loggerAll.debug(message);
    await this.kafkaLogger.logMessage('debug', this.messageFormat(message, "DEBUG")); // Log en Kafka
  }

  async verbose(message: string) {
    this.loggerAll.verbose(message);
    await this.kafkaLogger.logMessage('verbose', this.messageFormat(message, "VERBOSE")); // Log en Kafka
  }
}
