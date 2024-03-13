import Joi from "joi";
import { IAccountBioSchema, IAddressSchema } from "../../types/validations/vendor.types.js";

export const contactInfo = (data: IAddressSchema) => {
    const dataSchema = Joi.object<IAddressSchema>({
        fullname: Joi.string().required(),
        street: Joi.string().required(),
        postal_code: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.string().min(10),
    })

    return dataSchema.validate(data, { abortEarly: false })
}

export const accountBio = (data: IAccountBioSchema) => {
    const dataSchema = Joi.object<IAccountBioSchema>({
        name: Joi.string().required(),
    })

    return dataSchema.validate(data, { abortEarly: false })
}