import Joi from "joi";
import { IOrderStatusUpdateSchema } from "../../types/validations/vendor.types.js";


export const orderStatusUpdate = (data: IOrderStatusUpdateSchema) => {
    const dataSchema = Joi.object<IOrderStatusUpdateSchema>({
        order_id: Joi.string().required(),
        status: Joi.string().required(),
    });

    return dataSchema.validate(data, { abortEarly: false })
}