import { knexConnection } from '../../database'
import { logger } from "../../common/utils/winston";

export class UserRoleRepository {
	static #instance;

	superQuery() {
		return knexConnection;
	}

	static getInstance() {
		if (!UserRoleRepository.#instance) {
			UserRoleRepository.#instance = new UserRoleRepository(knexConnection.table('users_roles'));
			logger.info(`[${UserRoleRepository.name}] is bundling`);
		}
		return UserRoleRepository.#instance;
	}

	/**
	 * @type {import ('knex').QueryInterface}
	 */
	connection;

	constructor(connection) {
		this.connection = connection;
	}

	builder() {
		return this.connection.clone();
	}

	createOne(data) {
		return this.builder().insert(data);
	}

}