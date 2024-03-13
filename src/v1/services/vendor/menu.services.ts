import { Request } from "express";
import prisma from "../../../prisma.config.js";
import AuthUser from "../../utils/authUser.js";
import {
    IMenuAddSchema,
    IMenuCategoryAddSchema,
    IMenuCategoryUpdateSchema,
    IMenuUpdateSchema
} from "../../types/validations/vendor.types.js";

export async function getMenuCategories(req: Request) {
    const resp = await prisma.vendorMenuCategory.findMany({
        where: { vendor_user_id: AuthUser(req).id },
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
                    stock: true
                }
            }
        }
    });
    return resp;
}

export async function getMenusByCategoryId(req: Request, category_id: string) {
    const resp = await prisma.vendorMenu.findMany({
        where: { vendor_user_id: AuthUser(req).id, vendor_menu_category_id: parseInt(category_id) },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            wait_time: true,
            stock: true
        }
    });
    return resp;
}

export async function getMenus(req: Request) {
    const resp = await prisma.vendorMenu.findMany({
        where: { vendor_user_id: AuthUser(req).id },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            wait_time: true,
            stock: true
        }
    });
    return resp;
}

export async function deleteMenu(req: Request, menu_id: string) {
    const resp = await prisma.vendorMenu.delete({
        where: { vendor_user_id: AuthUser(req).id, id: parseInt(menu_id)}
    });
    return resp;
}

export async function updateMenu(req: Request, body: IMenuUpdateSchema) {
    const resp = await prisma.vendorMenu.update({
        where: { id: parseInt(body.menu_id), vendor_user_id: AuthUser(req).id },
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            wait_time: parseInt(body.wait_time),
            stock: parseInt(body.stock),
            image: body.image,
        }
    });
    return resp;
}

export async function addMenu(req: Request, body: IMenuAddSchema) {
    const resp = await prisma.vendorMenu.create({
        data: {
            vendor_user_id: AuthUser(req).id,
            vendor_menu_category_id: parseInt(body.vendor_menu_category_id),
            name: body.name,
            description: body.description,
            price: body.price,
            wait_time: parseInt(body.wait_time),
            stock: parseInt(body.stock),
            image: body.image,
        }
    });
    return resp;
}

export async function updateMenuCategory(req: Request, body: IMenuCategoryUpdateSchema) {
    const resp = await prisma.vendorMenuCategory.update({
        where: { id: parseInt(body.menu_category_id), vendor_user_id: AuthUser(req).id },
        data: {
            name: body.name
        }
    });
    return resp;
}

export async function addMenuCategory(req: Request, body: IMenuCategoryAddSchema) {
    const resp = await prisma.vendorMenuCategory.create({
        data: {
            vendor_user_id: AuthUser(req).id,
            name: body.name
        }
    });
    return resp;
}

export async function deleteMenuCategory(req: Request, menu_category_id: string) {
    const resp = await prisma.vendorMenuCategory.delete({
        where: { vendor_user_id: AuthUser(req).id, id: parseInt(menu_category_id) }
    });
    return resp;
}