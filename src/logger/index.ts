import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] ${label?"["+label+"]":"[]"} [${level}] ${message}`;
});
 

export const logger = createLogger({
  level: 'info',
  // format: format.json(),
  format: combine(
    // label({ label: 'right meow!' }),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [

    // new transports.File({ filename: './error.log', level: 'error' }),
    new transports.File({ filename: './combined.log' }),
    // new transports.Console(),
  ],
});
 
if (process.env.NODE_ENV.trim() !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}