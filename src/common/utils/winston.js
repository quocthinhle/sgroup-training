import { createLogger, transports, format } from 'winston';
import { join } from 'path';

const {
    combine, timestamp,
    printf, colorize,
    splat, simple
} = format;

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
    // show log on console
        new transports.Console({
            level: 'info',
            format: combine(
                simple(), splat(),
                timestamp({
                    format: 'HH:mm:ss DD-MM-YYYY',
                }),
                colorize(),
                printf(log => {
                    if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
                    return `\x1B[92m[${log.timestamp}] [${log.level}] ${log.message}`;
                })
            )
        }),
        // write errors to file
        new transports.File({
            filename: join(process.cwd(), 'logs/errors.log'),
            level: 'error',
            format: simple(),
        })
    ],
});

export { logger };
