import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  ico: {
    type: String,
    required: true,
    unique: true 
  },
  dic: {
    type: String,
    required: true,
    unique: true 
  },
  icdph: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
