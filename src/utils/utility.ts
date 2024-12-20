import Joi from "joi";

export const option = {
  abortEarly: false,
  // allowUnknown: true,
  // stripUnknown: true,
  errors: {
    wrap: {
      label: "",
    },
  },
};


export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
  role: Joi.string().optional(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title cannot be an empty field",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description should be a type of text",
  }),
  dueDate: Joi.date().greater("now").required().messages({
    "date.base": "Due date should be a valid date",
    "date.greater": "Due date must be in the future",
    "any.required": "Due date is required",
  }),

 
});


export const updateTaskSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "Title should be a type of text",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description should be a type of text",
  }),
  dueDate: Joi.date().greater("now").messages({
    "date.base": "Due date should be a valid date",
    "date.greater": "Due date must be in the future",
  }),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .messages({
      "any.only": "Status must be one of [pending, in-progress, completed]",
    }),
}).min(1); 