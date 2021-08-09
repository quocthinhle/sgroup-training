import { ERROR_CODE } from '../../../common/enum/error.enum';
import { logger } from '../../../common/utils/winston';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { HttpException } from '../exceptions/base';

/**
 * 
 * @param {import('../exceptions/base')} exception 
 * @returns 
 */
export function httpExceptionHandler(exception) {
    if (exception instanceof HttpException) {
        return res => res.status(exception.status).json({
            code: exception.code,
            message: exception.message,
            status: exception.status
        });
    }

    logger.error(exception.message);
    logger.error(exception.stack);

    return res => res.status(INTERNAL_SERVER_ERROR).json({
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: exception.message,
        status: INTERNAL_SERVER_ERROR
    });
}
