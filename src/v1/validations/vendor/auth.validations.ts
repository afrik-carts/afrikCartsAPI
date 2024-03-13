import Joi from "joi";
import { ILoginSchema, IRegisterSchema } from "../../types/validations/vendor.types.js";

export const register = (data: IRegisterSchema) => {
    const dataSchema = Joi.object<IRegisterSchema>({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        legal_identifier: Joi.string().required(),
        opening_time: Joi.string().required(),
        closing_time: Joi.string().required(),
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