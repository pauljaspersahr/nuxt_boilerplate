import pino, { type Logger } from 'pino';

const serverLogger: Logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: { colorize: true },
        }
      : undefined,
});

const clientLogger = {
  info: (...args: unknown[]) => console.info('[INFO]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
  warn: (...args: unknown[]) => console.warn('[WARN]', ...args),
  debug: (...args: unknown[]) => console.debug('[DEBUG]', ...args),
  trace: (...args: unknown[]) => console.trace('[TRACE]', ...args),
};

const log = import.meta.server ? serverLogger : clientLogger;

export { type Logger, log };
export default log;
