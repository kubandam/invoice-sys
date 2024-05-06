import UserModel from "~/server/models/User.model";
import { UserSchema } from "~~/server/validation";

export default defineEventHandler(async (event:any) => {
	const body = await readBody(event);
	let { value, error } = UserSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}
	try {
		await UserModel.create(body);
		return { message: "User created" };
	} catch (e: any) {
		throw createError({
			message: e.message,
		});
	}
});