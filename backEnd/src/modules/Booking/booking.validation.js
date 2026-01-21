import joi from "joi";

export const createBookingSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(50)
    .required(),

  age: joi.number()
    .min(5)
    .max(80)
    .required(),

  phone: joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),

  service: joi.string()
    .required(),

  price: joi.number()
    .positive()
    .required(),

  day: joi.string()
    .required(),

  time: joi.string()
    .required(),
}).required();
