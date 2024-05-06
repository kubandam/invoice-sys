import UserModel from "~/server/models/User.model";

export default defineEventHandler(async (event:any) => {
	const id = event?.context?.params?.id;
	try {
		await UserModel.findByIdAndDelete(id);
		return { message: "Author removed" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});