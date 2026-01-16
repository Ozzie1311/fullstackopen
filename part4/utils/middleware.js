const { info, error: errorLogger } = require('./logger')

const requestLogger = (request, response, next) => {
    info('Method: ', request.method)
    info('Path: ', request.path)
    info('Body: ', request.body)
    next()
}

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown Endpoint' })
}

const errorHandler = (error, request, response, next) => {
    errorLogger(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
