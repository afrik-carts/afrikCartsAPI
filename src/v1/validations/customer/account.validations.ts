import Joi from "joi";
import { IAccountBioSchema, IAddAddressInfoSchema, IUpdateAddressInfoSchema } from "../../types/validations/customer.types.js";

export const addAddressInfo = (data: IAddAddressInfoSchema) => {
    const dataSchema = Joi.object<IAddAddressInfoSchema>({
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

export const updateAddressInfo = (data: IUpdateAddressInfoSchema) => {
    const dataSchema = Joi.object<IUpdateAddressInfoSchema>({
        address_id: Joi.string().required(),
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
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
    })

    return dataSchema.validate(data, { abortEarly: false })
}