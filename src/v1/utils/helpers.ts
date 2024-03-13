// import { RESULT_PER_PAGE } from "../v1/config.js";
import Joi from "joi"
import { ORDER_STATUS_TYPE, CATEGORY_TYPE } from "../types/global.types.js";
import { CATEGORY } from "@prisma/client";

export function isValidOrderStatus(status: any): status is ORDER_STATUS_TYPE {
    return ['pending', 'paid', 'confirmed', 'preparing', 'delivering', 'delivered'].includes(status);
}

export function isValidCategory(category: any): category is CATEGORY_TYPE {
    return ['food', 'groceries'].includes(category);
}

export function getCategory(category:CATEGORY_TYPE): CATEGORY {
    if (category === "food") {
        return CATEGORY.FOOD
    }else {
        return CATEGORY.GROCERIES
    }
}

export function ucfirst(str: string) {
    //convert first letter to uppercase
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}


export function currencyFormat(data: number) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(data)
}

export function truncate(str: string, length = 25) {
    if (str.length < 1) return
    let truncatedString = str
    if (length > 10 && str.length > length ) {
        truncatedString = str.substring(0, length-3)+' ...'
    }
    return truncatedString
}

export function handlePaginate(_page:number, _resultPerPage = 10) {
    return {
        offset: (_page-1)*_resultPerPage,
        limit: _resultPerPage
    }
}

export function handleValidationErrors(error: Array<Joi.ValidationErrorItem>) {
    throw error;
}