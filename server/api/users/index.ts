import UserModel from "~/server/models/User.model"

export default defineEventHandler(async () => {
    return await UserModel.find();
})