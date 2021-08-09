import joi from 'joi';
import  { ERROR_CODE } from '../.././../common/enum/index';
import { BAD_REQUEST } from 'http-status';

export function loginValidator(req, res, next) {
	const schema = joi.object({
		username: joi.string().required(),
		password: joi.string().min(6).required()
	});

	const result = schema.validate(req.body);

	if (result.error) {
		return res.status(BAD_REQUEST).json({
			code: ERROR_CODE.BAD_REQUEST,
			message: result.error
		});
	}

	return next();
}