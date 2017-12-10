const {createLogger, format, transports} = require('winston')
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const loggerByFileName = filename => createLogger({
    level: 'info',
    format: combine(
        format.simple(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename })
    ]
})

const getLogger = (name, fileName) => {
    let logger = loggerByFileName(!fileName ? 'combined.log' : fileName)
    return ({
        info: (message) => logger.info(`${name}. ${message}.`),
        warn: (message) => logger.warn(`${name}. ${message}.`),
        error: (message) => logger.error(`${name}. ${message}.`)
    })
}

export default getLogger;