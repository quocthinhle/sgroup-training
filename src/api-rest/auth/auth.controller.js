import { OK, UNAUTHORIZED } from "http-status";
import { JwtService } from "./services/jwt.service";
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

	authorization = (req, res, next) => {
		const userToken = req.headers['authorization'].split(' ')[1];
		const decodedToken = JwtService.getInstance().decode(userToken);
		const roles = decodedToken['roles'];
		let isAuthorized = false;
		roles.forEach(element => {
			if (element['id'] == 1 || element['id'] == 2) {
				isAuthorized = true;
			}
		});
		return isAuthorized? next() : res.status(UNAUTHORIZED);
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