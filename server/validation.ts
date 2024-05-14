import Joi from "joi";

export const UserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const CompanySchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string.',
      'any.required': 'User ID is required.'
    }),
  ico: Joi.string()
    .pattern(new RegExp("^[0-9]{8}$"))
    .required()
    .messages({
      'string.pattern.base': 'ICO must be exactly 8 digits.',
      'any.required': 'ICO is required.'
    }),
  dic: Joi.string()
    .pattern(new RegExp("^[0-9]{10}$"))
    .required()
    .messages({
      'string.pattern.base': 'DIC must be exactly 10 digits.',
      'any.required': 'DIC is required.'
    }),
  icdph: Joi.string()
    .pattern(new RegExp("^[A-Z]{2}[0-9]{8,10}$"))
    .optional()
    .messages({
      'string.pattern.base': 'ICDPH must start with 2 letters followed by 8 to 10 digits.'
    }),
  address: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.min': 'Address must be at least 5 characters long.',
      'any.required': 'Address is required.'
    }),
  zip: Joi.string()
    .pattern(new RegExp("^[0-9]{5}$"))
    .required()
    .messages({
      'string.pattern.base': 'ZIP must be exactly 5 digits.',
      'any.required': 'ZIP is required.'
    }),
  town: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.min': 'Town must be at least 2 characters long.',
      'any.required': 'Town is required.'
    }),
  country: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.min': 'Country must be at least 2 characters long.',
      'any.required': 'Country is required.'
    }),
});
