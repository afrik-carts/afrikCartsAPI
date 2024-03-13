export interface IRegisterBaseSchema {
    email: string;
    password: string;
}

export interface ILoginBaseSchema {
    email: string;
    password: string;
}

export interface IAddressBaseSchema {
    fullname: string;
    city: string;
    street: string;
    postal_code: string;
    state: string;
    country: string;
    phone: string;
}