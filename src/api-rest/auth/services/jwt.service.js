import { sign, decode } from 'jsonwebtoken';
import { ConfigService } from "../../../libs/config/config.service";
import { logger } from '../../../common/utils/winston';

export class JwtService {
	/**
	 * @type {JwtService}
	 */
	static #instance;

	static getInstance() {
		if (!JwtService.#instance) {
			JwtService.#instance = new JwtService(
				ConfigService.getInstance().get('JWT_SECRET'),
                ConfigService.getInstance().get('EXPIRES_IN')
			);
			logger.info('JWT Service is building');
		}
		return JwtService.#instance;
	}

	constructor(secret, expiresIn) {
		this.secret = secret;
		this.expiresIn = expiresIn;
	}

	sign(payload) {
		return sign(payload, this.secret, {
			expiresIn: this.expiresIn
		});
	}

	decode(token) {
		return decode(token);
	}
}