"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] ${label ? "[" + label + "]" : "[]"} [${level}] ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    // format: format.json(),
    format: combine(
    // label({ label: 'right meow!' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
    // defaultMeta: { service: 'user-service' },
    transports: [
        // new transports.File({ filename: './error.log', level: 'error' }),
        new winston_1.transports.File({ filename: './combined.log' }),
        // new transports.Console(),
    ],
});
if (process.env.NODE_ENV.trim() !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
