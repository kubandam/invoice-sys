import CompanyModel from "~/server/models/Company.model";
import CompanyUserModel from "~/server/models/CompanyUserModel";
import { CompanySchema } from "~~/server/validation";

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event);
    let { value, error } = CompanySchema.validate(body);
    if (error) {
        throw createError({
            message: error.message.replace(/"/g, ""), 
            statusCode: 400,
            fatal: false,
        });
    }
    try {
        const company = await CompanyModel.create(value);
        await CompanyUserModel.create({
        company_id: company._id,
        user_id: value.user_id,
        });
        return { message: "Company created" };
    } catch (e: any) {
        throw createError({
            message: e.message, 
            statusCode: e.statusCode || 500, 
        });
    }
});
