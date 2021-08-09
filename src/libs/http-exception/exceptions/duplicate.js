import { CONFLICT } from "http-status";
import { ERROR_CODE } from "../../../common/enum/error.enum";
import { HttpException } from "./base"

export class DuplicateException extends HttpException {
	constructor(msg = 'Duplicate record') {
		super(CONFLICT, ERROR_CODE.DUPLICATE, msg);
	}
}