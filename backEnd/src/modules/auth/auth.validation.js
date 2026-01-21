import  joi  from 'joi';
export const adminLogin = joi.object({
  username: joi.string()
    .min(3)
    .max(30)
    .required(),

  password: joi.string()
    .min(6)
    .required(),
}).required();