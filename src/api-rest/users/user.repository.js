import { knexConnection } from '../../database'
import { logger } from "../../common/utils/winston";

export class UserRepository {
	static #instance;

	superQuery() {
		return knexConnection;
	}

	static getInstance() {
		if (!UserRepository.#instance) {
			UserRepository.#instance = new UserRepository(knexConnection.table('users'));
			logger.info(`[${UserRepository.name}] is bundling`);
		}
		return UserRepository.#instance;
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
		return this.builder().insert(data).returning("id");
	}

	getOneBy(fieldName, value, columns = "*") {
		return this.builder().select(columns).where(fieldName, "=" , value);
	}

	getAll(limit, offset, columns = "*") {
		return this.builder().select(columns).offset(offset).limit(limit);
	}
}