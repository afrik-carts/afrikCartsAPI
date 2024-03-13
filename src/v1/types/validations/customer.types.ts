import { IAddressBaseSchema, ILoginBaseSchema, IRegisterBaseSchema } from "./base.types.js";

export interface IRegisterSchema extends IRegisterBaseSchema {
    phone: string | undefined;
    firstname: string;
    lastname: string;
    profile_image: string | undefined;
}

export interface ILoginSchema extends ILoginBaseSchema { }

export interface IAddAddressInfoSchema extends IAddressBaseSchema {}

export interface IUpdateAddressInfoSchema extends IAddressBaseSchema {
    address_id: string;
}

export interface IAccountBioSchema {
    firstname: string;
    lastname: string;
}

export interface IAddItemToCartSchema {
    menu_id: string;
    quantity: string;
}

export interface IRemoveItemFromCartSchema {
    cart_item_id: string;
    quantity: string;
}

export interface IPlaceOrder {
    coupon_code: string | undefined;
    delivery_time: string | undefined;
    address_id: string;
}