import mongoose from 'mongoose';

const companyUserSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
});

export default mongoose.model('CompanyUser', companyUserSchema);
