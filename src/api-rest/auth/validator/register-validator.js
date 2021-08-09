import joi from 'joi';
import  { ERROR_CODE } from '../.././../common/enum/index';
import { BAD_REQUEST } from 'http-status';

export function registerValidator(req, res, next) {
	const schema = joi.object({
		username: joi.string().min(5).required(),
		fullname: joi.string().min(2),
		email: joi.string().email().required(),
		password: joi.string().min(6).required(),
		confirm_password: joi.ref('password')
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