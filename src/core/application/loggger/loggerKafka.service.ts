// loggerKafka.service.ts
import { Injectable } from '@nestjs/common';
import { KafkaLogger } from 'kafka-logger-mm'; // Importamos la librería de Kafka
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerKafkaService extends LoggerService {
  private kafkaLogger: KafkaLogger;

  constructor() {
    super();
    // Inicializamos el KafkaLogger con el broker y el tópico deseado
    this.kafkaLogger = new KafkaLogger(['localhost:9092'], 'example');
    this.kafkaLogger.connect(); // Conectamos a Kafka
  }

  async log(message: string) {
    await super.log(message); // Llama al método log de la clase base
    await this.kafkaLogger.logMessage('info', this.messageFormat(message, "INFO")); // Log en Kafka
  }

  async error(message: string) {
    await super.error(message); // Llama al método error de la clase base
    await this.kafkaLogger.logMessage('error', this.messageFormat(message, "ERROR")); // Log en Kafka
  }

  async warn(message: string) {
    await super.warn(message); // Llama al método warn de la clase base
    await this.kafkaLogger.logMessage('warn', this.messageFormat(message, "WARN")); // Log en Kafka
  }

  async debug(message: string) {
    await super.debug(message); // Llama al método debug de la clase base
    await this.kafkaLogger.logMessage('debug', this.messageFormat(message, "DEBUG")); // Log en Kafka
  }

  async verbose(message: string) {
    await super.verbose(message); // Llama al método verbose de la clase base
    await this.kafkaLogger.logMessage('verbose', this.messageFormat(message, "VERBOSE")); // Log en Kafka
  }

  private messageFormat(message: string, level: string) {
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
    return `${formatDate()} - [${level.toUpperCase()}] ${message}`;
  }
}
