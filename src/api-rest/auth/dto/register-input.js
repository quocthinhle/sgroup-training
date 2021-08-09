export function registerInput(body) {
	return {
		username: body.username,
		fullname: body.fullname,
		password: body.password,
		email: body.email,
		confirm_password: body.confirm_password
	};
};