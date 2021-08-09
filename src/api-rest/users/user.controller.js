import { OK } from "http-status";
import { logger } from "../../common/utils/winston";
import { UserService } from "./user.service";

export class UserController {
	/**
	 * @type {UserController}
	 */
	static #instance;

	static getInstance() {
		if (!UserController.#instance) {
			UserController.#instance = new UserController(UserService.getInstance());
			logger.info(`[${UserController.name}] is bundling`);
		}
		return UserController.#instance;
	}

	/**
	 * @type {UserService}
	 */
	#userService;

    constructor(userService) {
        this.#userService = userService;
    }

	getAll = async (req, res) => {
		const data = await this.#userService.getAll(req.query);
		return res.status(OK).json(data);
	}

	getNumRecord = async (req, res) => {
		const data = await this.#userService.getNumRecords();
		return res.status(OK).json(data);
	}
}