import { logger } from "../../common/utils/winston";
import { UserRepository } from "./user.repository";
import { DuplicateException } from "../../libs/http-exception/exceptions/duplicate"
import { SortQuery } from "../../modules/query/sort.query";

export class UserService {
	/**
	 * @type {UserService}
	 */
	static #instance;

	static getInstance() {
		if (!UserService.#instance) {
			UserService.#instance = new UserService(UserRepository.getInstance());
		}
		logger.info(`[${UserService.name}] is bundling`);
		return UserService.#instance;
	}


	/**
	 * @type {UserRepository}
	 */
	#userRepository;

	constructor(UserRepository) {
		this.#userRepository = UserRepository;
	}

	async createOneAndReturn(data) {
		try {
			const userBuilder = this.#userRepository.getAll().where("email", data.email);
			const userExist = await userBuilder;
			
			if (userExist.length) {
				console.log("?");
				throw new DuplicateException(`Email: ${data.email} has been taken`)
			}

			const [id] = await this.#userRepository.createOne(data);
			console.log(id);
			return id;
		} catch(error) {
			console.log(error);
			throw new DuplicateException(`username: ${data.username} has been existed`)
		}
	}

	async getAll(query) {
		let queryStatement = `SELECT * FROM (SELECT * from users Where username like '%${query.searchContent}%' or fullname like '%${query.searchContent}%' limit ${query.perPage} offset ${(parseInt(query.page) - 1) * parseInt(query.perPage)}) s left join users_roles on s.id = users_roles.user_id left join roles on users_roles.role_id = roles.id `;
		
		if (query.sortType) {
			const sortQueryInstance = new SortQuery();
			const sortInfo = sortQueryInstance.transform(query.sortType);
			if (sortInfo) {
				queryStatement += sortQueryInstance.queryStatement(sortInfo);
			}
		}

		const knexQuery = this.#userRepository.superQuery().raw(queryStatement);


		const rows = await knexQuery;
		const result = {};

		rows.rows.forEach(row => {
			if (result[" " + row.user_id]) {
				result[" " + row.user_id].roles_name += `, ${row.name}`;
			} else {
				result[" " + row.user_id] = {
					roles_name: row.name,
					full_name: row.fullname,
					avatar: row.avatar,
					city: row.city,
					username: row.username,
					id: row.user_id,
					status: row.status
				};
			}
		});
		
		return Object.values(result);
	}

	async getByUsernameWithRoles(username) {
        const rows = await this.#userRepository.getOneBy('username', username)
            .leftJoin('users_roles', 'users_roles.user_id', '=', 'users.id')
            .leftJoin('roles', 'users_roles.role_id', '=', 'roles.id');
			
        const user = rows[0];
        user.roles = [];

        rows.forEach(row => {
            user.roles.push({
                id: row.role_id,
                name: row.name
            });
        });

        delete user.role_id;
        delete user.user_id;
        delete user.name;

        return user;
    }

	async getNumRecords() {
		const query = "SELECT count(id) as total from users";
		const knexQuery = this.#userRepository.superQuery().raw(query);
		const rows = await knexQuery;

		return rows.rows[0].total;
	}
}