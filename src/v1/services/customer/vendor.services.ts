import prisma from "../../../prisma.config.js";
import { Request } from "express";
import { getCategory, isValidCategory } from "../../utils/helpers.js";
import { BadRequestError } from "../../utils/errors.js";

export async function getVendorById(req: Request, id:string) {
    const resp = await prisma.vendorAccount.findFirst({
        where: { id: parseInt(id) },
        select: {
            id: true,
            name: true,
            description: true,
            opening_time: true,
            closing_time: true,
            is_open_24hours: true,
            profile_image: true,
            cover_image: true,
            menu_categories: {
                select: {
                    id: true,
                    name: true,
                    menus: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            wait_time: true,
                            stock: true,
                            image: true,
                        }
                    }
                }
            }
        }
    });
    return resp;
}

export async function getVendors(req: Request, category: string) {
    if (!isValidCategory(category)) throw new BadRequestError("Invalid category (food | groceries)");
    const resp = await prisma.vendorAccount.findMany({
        where: {category: getCategory(category)},
        select: {
            id: true,
            name: true,
            description: true,
            opening_time: true,
            closing_time: true,
            is_open_24hours: true,
            profile_image: true,
            cover_image: true,
            menu_categories: {
                select: {
                    id: true,
                    name: true,
                    menus: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            wait_time: true,
                            stock: true,
                            image: true,
                        }
                    }
                }
            }
        }
    });
    return resp;
}

export async function getMenuById(req: Request, id:string) {
    const resp = await prisma.vendorMenu.findFirst({
        where: { id: parseInt(id) },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            wait_time: true,
            stock: true,
            image: true,
        }
    });
    return resp;
}