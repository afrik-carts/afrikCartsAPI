import Joi from "joi";
import { IAddItemToCartSchema, IPlaceOrder, IRemoveItemFromCartSchema } from "../../types/validations/customer.types.js";

export const addItemToCart = (data: IAddItemToCartSchema) => {
    const dataSchema = Joi.object<IAddItemToCartSchema>({
        menu_id: Joi.string().required(),
        quantity: Joi.string().required(),
    })

    return dataSchema.validate(data, { abortEarly: false })
}

export const removeItemFromCart = (data: IRemoveItemFromCartSchema) => {
    const dataSchema = Joi.object<IRemoveItemFromCartSchema>({
        cart_item_id: Joi.string().required(),
        quantity: Joi.string().required(),
    })

    return dataSchema.validate(data, { abortEarly: false })
}

export const placeOrder = (data: IPlaceOrder) => {
    const dataSchema = Joi.object<IPlaceOrder>({
        coupon_code: Joi.string(),
        delivery_time: Joi.string(),
        address_id: Joi.string().required(),
    })

    return dataSchema.validate(data, { abortEarly: false })
}