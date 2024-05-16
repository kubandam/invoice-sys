import CompanyModel from "~/server/models/Company.model";
import CompanyUserModel from "~/server/models/CompanyUserModel";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const company_user = await CompanyUserModel.findOne({ user_id: body.user_id}) as any;
  return await  CompanyModel.findOne({_id: company_user.company_id}) as any;
});
