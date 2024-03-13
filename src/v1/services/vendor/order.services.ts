import { Request } from "express";
import prisma from "../../../prisma.config.js";
import AuthUser from "../../utils/authUser.js";
import { ORDER_STATUS } from "@prisma/client";
import { IOrderStatusUpdateSchema } from "../../types/validations/vendor.types.js";
import { BadRequestError } from "../../utils/errors.js";
import { ORDER_STATUS_TYPE } from "../../types/global.types.js";
import { isValidOrderStatus } from "../../utils/helpers.js";

export async function getOrder(req: Request, id:string) {
    const resp = await prisma.order.findFirst({
        where: { vendor_user_id: AuthUser(req).id, id: parseInt(id) },
        select: {
            id: true,
            status: true,
            deliveryTime: true,
            total_price: true,
            discounted_price: true,
            coupon: true,
            items: true,
            customer: {
                select: {
                    firstname: true,
                    lastname: true,
                }
            },
            delivery_address: {
                select: {
                    id: true,
                    fullname: true,
                    phone: true,
                    street: true,
                    city: true,
                    postal_code: true,
                    state: true,
                    country: true,
                    location_description: true,
                    lat: true,
                    long: true
                }
            }
        }
    });
    return resp;
}

export async function getAllOrders(req: Request) {
    const resp = await prisma.order.findMany({
        where: { vendor_user_id: AuthUser(req).id },
        select: {
            id: true,
            status: true,
            deliveryTime: true,
            total_price: true,
            discounted_price: true,
            coupon: true,
            items: true,
            customer: {
                select: {
                    firstname: true,
                    lastname: true,
                }
            },
            delivery_address: {
                select: {
                    id: true,
                    fullname: true,
                    phone: true,
                    street: true,
                    city: true,
                    postal_code: true,
                    state: true,
                    country: true,
                    location_description: true,
                    lat: true,
                    long: true
                }
            }
        }
    });
    return resp;
}

export async function getOrdersByStatus(req: Request, status: string) {
    if (!isValidOrderStatus(status)) throw new BadRequestError("invalid order status");
    return getOrders(req, status);
}

export async function updateOrderStatus(req: Request, body: IOrderStatusUpdateSchema) {
    const resp = await prisma.order.findFirst({ where: { vendor_user_id: AuthUser(req).id, id: parseInt(body.order_id) } });
    if (!resp) throw new BadRequestError("invalid order");
    if (!isValidOrderStatus(body.status)) throw new BadRequestError("invalid order status");
    if (getOrderStatus(body.status as ORDER_STATUS_TYPE) !== (
        ORDER_STATUS.DECLINED || ORDER_STATUS.CONFIRMED || ORDER_STATUS.PREPARING || ORDER_STATUS.READY
    )) throw new BadRequestError("invalid order status");
    const update = await prisma.order.update({
        where: { id: parseInt(body.order_id) },
        data: {
            status: getOrderStatus(body.status as ORDER_STATUS_TYPE)
        }
    })
    return update;
}

async function getOrders(req: Request, status: ORDER_STATUS_TYPE) {
    const resp = await prisma.order.findMany({
        where: { vendor_user_id: AuthUser(req).id, status: getOrderStatus(status) },
        select: {
            id: true,
            status: true,
            deliveryTime: true,
            total_price: true,
            discounted_price: true,
            coupon: true,
            items: true,
            customer: {
                select: {
                    firstname: true,
                    lastname: true,
                }
            },
            delivery_address: {
                select: {
                    id: true,
                    fullname: true,
                    phone: true,
                    street: true,
                    city: true,
                    postal_code: true,
                    state: true,
                    country: true,
                    location_description: true,
                    lat: true,
                    long: true
                }
            }
        }
    });
    return resp;
}

function getOrderStatus(status: ORDER_STATUS_TYPE): ORDER_STATUS {
    const status_: ORDER_STATUS = status === "pending" ? ORDER_STATUS.PENDING :
        status === "paid" ? ORDER_STATUS.PAID :
            status === "declined" ? ORDER_STATUS.DECLINED :
                status === "confirmed" ? ORDER_STATUS.CONFIRMED :
                    status === "preparing" ? ORDER_STATUS.PREPARING :
                        status === "ready" ? ORDER_STATUS.READY :
                            status === "delivering" ? ORDER_STATUS.DELIVERING : ORDER_STATUS.DELIVERED;
    return status_;
}