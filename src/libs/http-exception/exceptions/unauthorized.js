import { ERROR_CODE } from "../../../common/enum/error.enum";
import { UNAUTHORIZED } from "http-status";
import { HttpException } from "./base";

export class UnAuthorizedException extends HttpException {
	constructor(msg = "Unauthorized") {
		super(UNAUTHORIZED, ERROR_CODE.TOKEN_INVALID, msg);
	}
}