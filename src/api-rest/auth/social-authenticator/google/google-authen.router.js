import { UserRepository } from "../../../users/user.repository";

const { Router } = require("express");
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_AUTHEN_CLIENT;
const client = new OAuth2Client(CLIENT_ID);

const router = Router();


router.post("/login", async (req, res, next) => {
	const token = req.body.token;

	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,  
		});
		const payload = ticket.getPayload();
		const userid = payload['sub'];
		return payload;
	}

	try {
		const payload = await verify();
		const userEmail = payload.email;
		const userExist = await UserRepository.getInstance().getOneBy("email", userEmail);

		if (userExist.length != 0) {
			return res.json({
				user_token: token
			});
		} else {
			return res.status(401).json({
				data: {
					email: userEmail,
					fullname: payload.name,
				}
			});
		}
	} catch(error) {
		console.log("Error");
	}
})

export const GoogleRouter = router;