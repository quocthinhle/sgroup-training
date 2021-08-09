import { OK } from "http-status";
import { httpExceptionHandler } from "../../libs/http-exception/handler/exception.handler"
import { loginInput } from "./dto/login-input";
import { registerInput } from "./dto/register-input";
import { AuthService } from "./services/auth.service";

export class AuthController {
	/**
	 * @type {AuthController}
	 */
	static #instance;

	static getInstance() {
		if (!AuthController.#instance) {
			AuthController.#instance = new AuthController(AuthService.getSingleton());
		}
		return AuthController.#instance;
	}

	/**
	 * @type {AuthService}
	 */
	#authService

	constructor(authService) {
		this.#authService = authService;
	}

	login = async (req, res, next) => {
		try {
			const data = await this.#authService.login(loginInput(req.body));

			return res.status(201).json({
				user_id: data.username,
				user_roles: data.roles,
				accessToken: data.accessToken
			});
		} catch(error) {
			console.log(error);
			return httpExceptionHandler(error)(res);
		}
	}

	register = async (req, res, next) => {
		try {
			const data = await this.#authService.register(registerInput(req.body));
			return res.status(OK).json(data);
		} catch(error) {
			return httpExceptionHandler(error)(res);
		}
	}
}

/*
	function(x) {
		return function(y) {
			return x + y;
		}
	}


	const func1 = httpExecep(error); => func1 = (res) => res.status...
	then call func1(res) => all done.
*/