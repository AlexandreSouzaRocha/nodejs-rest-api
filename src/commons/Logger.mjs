import winston from 'winston';
import ContextMiddleware from '../middleware/Context.mjs';

class Logger {
  static init() {
    const { createLogger, format, transports } = winston;
    const { printf, combine, json, timestamp: loggingTimestamp } = format;

    const logger = createLogger({
      format: combine(
        loggingTimestamp(),
        json(),
        printf((info) => {
          const { message, level, timestamp, event: eventBody } = info;
          let event = eventBody;
          if (message.event) {
            event = JSON.parse(JSON.stringify(message.event));
            Reflect.deleteProperty(message, 'event');
          }

          const trace = {
            timestamp,
            severityText: String(level).toUpperCase(),
            requestId: ContextMiddleware.getRequestId(),
            message: { ...message },
          };

          return `[${trace.severityText}]:[${trace.requestId}][${event}] ${JSON.stringify(trace)}`;
        }),
      ),
      transports: [new transports.Console()],
    });
    return logger;
  }
}

export default new Logger();
