import { IAddressBaseSchema, ILoginBaseSchema, IRegisterBaseSchema } from "./base.types.js";

export interface IRegisterSchema extends IRegisterBaseSchema {
    name: string;
    category: string;
    legal_identifier: string;
    profile_image: string | undefined;
    cover_image: string | undefined;
    description: string;
    opening_time: string,
    closing_time: string
}

export interface ILoginSchema extends ILoginBaseSchema {}

export interface IAddressSchema extends IAddressBaseSchema {}

export interface IAccountBioSchema {
    name: string;
    description: string;
    opening_time: string;
    closing_time: string;
}

export interface IOrderStatusUpdateSchema {
    order_id: string;
    status: string;
}

export interface IMenuAddSchema {
    vendor_menu_category_id: string;
    name: string;
    description: string;
    price: string;
    wait_time: string;
    stock: string;
    image: string;
}

export interface IMenuUpdateSchema {
    menu_id: string;
    name: string;
    description: string;
    price: string;
    wait_time: string;
    stock: string;
    image: string;
}

export interface IMenuCategoryAddSchema {
    name: string;
}

export interface IMenuCategoryUpdateSchema {
    name: string;
    menu_category_id: string;
}