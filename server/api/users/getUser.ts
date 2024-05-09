import { Body } from "./../../../.nuxt/components.d";
import UserModel from "~/server/models/User.model";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  return await UserModel.find({ name: body.name, password: body.password });
});
