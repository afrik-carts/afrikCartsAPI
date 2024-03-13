import Joi from "joi";
import { ILoginSchema, IRegisterSchema } from "../../types/validations/customer.types.js";

export const register = (data: IRegisterSchema) => {
    const dataSchema = Joi.object<IRegisterSchema>({
        email: Joi.string().email().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string().min(10),
        password: Joi.string().min(6).required(),
    })

    return dataSchema.validate(data, { abortEarly: false })
}

export const login = (data: ILoginSchema) => {
    const dataSchema = Joi.object<ILoginSchema>({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    return dataSchema.validate(data, { abortEarly: false })
}