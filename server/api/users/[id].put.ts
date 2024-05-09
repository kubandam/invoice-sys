import UserModel from "~/server/models/User.model";

export default defineEventHandler(async (event: any) => {
  const id = event?.context?.params?.id;
  const body = await readBody(event);
  try {
    await UserModel.findByIdAndUpdate(id, {
      name: body.name,
      phone: body.phone,
    });
    return { message: "Profile updated" };
  } catch (e: any) {
    throw createError({
      message: e.message,
    });
  }
});
