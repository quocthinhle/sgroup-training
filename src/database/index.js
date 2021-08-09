import knex from 'knex';
import config from '../../knexfile';
import { ConfigService } from "../libs/config/config.service";
import { logger } from '../common/utils';


export const knexConnection = knex(config[ConfigService.getInstance().get('NODE_ENV')]);

export const getTransaction = () => knexConnection.getTransaction();

export const authenDatabaseConnection = async () => {
	try {
		await knexConnection.raw('SELECT 1');
		logger.info('Database connected');
	} catch(error) {
		logger.info(error.trace);
		logger.info(error.message);
	}
}