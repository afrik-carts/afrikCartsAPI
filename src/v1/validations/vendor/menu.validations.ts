import Joi from "joi";
import {
    IMenuAddSchema,
    IMenuCategoryAddSchema,
    IMenuCategoryUpdateSchema,
    IMenuUpdateSchema
} from "../../types/validations/vendor.types.js";


export const addMenu = (data: IMenuAddSchema) => {
    const dataSchema = Joi.object<IMenuAddSchema>({
        vendor_menu_category_id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
        wait_time: Joi.string().required(),
        stock: Joi.string().required(),
        image: Joi.string().required(),
    });

    return dataSchema.validate(data, { abortEarly: false })
}

export const updateMenu = (data: IMenuUpdateSchema) => {
    const dataSchema = Joi.object<IMenuUpdateSchema>({
        menu_id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
        wait_time: Joi.string().required(),
        stock: Joi.string().required(),
        image: Joi.string().required(),
    });

    return dataSchema.validate(data, { abortEarly: false })
}

export const addMenuCategory = (data: IMenuCategoryAddSchema) => {
    const dataSchema = Joi.object<IMenuCategoryAddSchema>({
        name: Joi.string().required(),
    });

    return dataSchema.validate(data, { abortEarly: false })
}

export const updateMenuCategory = (data: IMenuCategoryUpdateSchema) => {
    const dataSchema = Joi.object<IMenuCategoryUpdateSchema>({
        menu_category_id: Joi.string().required(),
        name: Joi.string().required(),
    });

    return dataSchema.validate(data, { abortEarly: false })
}