import CompanyModel from "~/server/models/Company.model";
import { CompanySchema } from "~~/server/validation";

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event);
    const companyId = event.context.params.companyId;

    let { value, error } = CompanySchema.validate(body);
    if (error) {
        throw createError({
            message: error.message.replace(/"/g, ''), 
            statusCode: 400,
            fatal: false,
        });
    }
    try {
        const updatedCompany = await CompanyModel.findByIdAndUpdate(companyId, value, { new: true });
        if (!updatedCompany) {
            throw createError({ 
                message: 'Company not found',
                statusCode: 404,
            });
        }
        return { message: "Company updated", company: updatedCompany };
    } catch (e: any) {
        throw createError({
            message: e.message,
            statusCode: e.statusCode || 500,
        });
    }
});
