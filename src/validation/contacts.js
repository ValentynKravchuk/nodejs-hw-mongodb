import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactScheme = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9\s\-]{7,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must contain 7-15 digits and can start with +',
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
    }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Invalid email format',
  }),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
      'any.required': 'Contact type is required',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactScheme = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of: work, home, personal',
  }),
});
