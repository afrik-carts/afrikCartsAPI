import { ORDER_STATUS } from "@prisma/client";
import { ORDER_STATUS_TYPE } from "../../types/global.types.js";
import AuthUser from "../../utils/authUser.js";
import prisma from "../../../prisma.config.js";
import { Request } from "express";
import { generateRandomString, isValidOrderStatus } from "../../utils/helpers.js";
import { BadRequestError } from "../../utils/errors.js";
import { IAddItemToCartSchema, IPlaceOrder, IRemoveItemFromCartSchema } from "../../types/validations/customer.types.js";
import { Decimal } from "@prisma/client/runtime/library";

export async function getOrder(req: Request, id: string) {
    const resp = await prisma.order.findFirst({
        where: { customer_user_id: AuthUser(req).id, id: parseInt(id) },
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
        where: { customer_user_id: AuthUser(req).id },
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

async function getOrders(req: Request, status: ORDER_STATUS_TYPE) {
    const resp = await prisma.order.findMany({
        where: { customer_user_id: AuthUser(req).id, status: getOrderStatus(status) },
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

export async function getCart(req: Request) {
    const resp = await prisma.cart.findMany({
        where: { customer_user_id: AuthUser(req).id },
        select: {
            id: true,
            items: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    wait_time: true,
                    price: true,
                    quantity: true,
                }
            },
            vendor: {
                select: {
                    user_id: true,
                    name: true,
                    profile_image: true,
                    cover_image: true,
                    opening_time: true,
                    closing_time: true,
                    is_open_24hours: true,
                    address: true
                }
            }
        }
    });
    return resp;
    // return resp ? resp.map((res) => ({...res, vendor: {...res.vendor, id: res.vendor.user_id}})) : [];
}

export async function addItemToCart(req: Request, body: IAddItemToCartSchema) {

    // get menu item
    const getMenuItem = await prisma.vendorMenu.findFirst({
        where: { id: parseInt(body.menu_id) }
    });
    if (!getMenuItem) throw new BadRequestError("Invalid menu item");

    // get cart
    let getCart = await prisma.cart.findFirst({
        where: { customer_user_id: AuthUser(req).id }
    })
    if (!getCart) {
        getCart = await prisma.cart.create({
            data: {
                customer_user_id: AuthUser(req).id,
                vendor_user_id: getMenuItem.vendor_user_id
            }
        });
    } else {
        if (getCart.vendor_user_id !== getMenuItem.vendor_user_id) {
            throw new BadRequestError("You already have an open cart with another vendor. Clear your existing cart or complete order to continue")
        }
    }

    // get cart item
    const getCartItem = await prisma.cartItem.findFirst({
        where: { menu_id: parseInt(body.menu_id), customer_user_id: AuthUser(req).id, cart_id: getCart.id }
    });

    if (getCartItem) {
        const quantity = getCartItem.quantity + parseInt(body.quantity);
        await prisma.cartItem.update({
            where: { id: getCartItem.id, customer_user_id: AuthUser(req).id },
            data: {
                quantity: quantity
            }
        });
        return quantity;
    } else {
        await prisma.cartItem.create({
            data: {
                customer_user_id: AuthUser(req).id,
                menu_id: parseInt(body.menu_id),
                cart_id: getCart.id,
                quantity: parseInt(body.quantity),
                name: getMenuItem.name,
                description: getMenuItem.description,
                price: getMenuItem.price,
                wait_time: getMenuItem.wait_time,
            }
        });
        return { quantity: parseInt(body.quantity) };
    }
}

export async function removeItemFromCart(req: Request, body: IRemoveItemFromCartSchema) {

    // get cart
    const getCart = await prisma.cart.findFirst({
        where: { customer_user_id: AuthUser(req).id }
    })

    if (!getCart) throw new BadRequestError("You do not have any active cart");

    // get cart item
    const getCartItem = await prisma.cartItem.findFirst({
        where: { menu_id: parseInt(body.cart_item_id), customer_user_id: AuthUser(req).id, cart_id: getCart.id }
    });

    if (!getCartItem) {
        throw new BadRequestError("Invalid cart item")
    } else {
        const quantity = getCartItem.quantity - parseInt(body.quantity);
        if (quantity < 1) {
            await prisma.cartItem.delete({
                where: { id: getCartItem.id }
            });
        } else {
            await prisma.cartItem.update({
                where: { id: getCartItem.id },
                data: {
                    quantity: quantity
                }
            });
        }
        return { quantity: quantity };
    }
}

export async function placeOrder(req: Request, body: IPlaceOrder) {

    // get cart
    const getCart = await prisma.cart.findFirst({
        where: { customer_user_id: AuthUser(req).id }
    })

    if (!getCart) throw new BadRequestError("You do not have any active cart");

    const getAddress = await prisma.address.findFirst({
        where: { id: parseInt(body.address_id) }
    });

    if (!getAddress) throw new BadRequestError("invalid delivery address_id")

    // get cart items
    const getCartItems = await prisma.cartItem.findMany({
        where: { customer_user_id: AuthUser(req).id, cart_id: getCart.id }
    });

    if (getCartItems.length < 1) {
        throw new BadRequestError("There are no item in your cart")
    } else {
        let total_price = 0;
        for (let i = 0; i < getCartItems.length; i++) {
            total_price += parseFloat(getCartItems[i].price.toFixed(2)) * getCartItems[i].quantity;
        }

        let discounted_price: Decimal = new Decimal(0);
        let _coupon_id: number | undefined = undefined;

        if (body.coupon_code) {
            const getCoupon = await prisma.coupon.findFirst({
                where: { code: body.coupon_code }
            })
            if (getCoupon && ((new Date(`${getCoupon.expires_at}`)).getTime() > Date.now())) {
                discounted_price = new Decimal((getCoupon.discount / 100) * total_price)
                _coupon_id = getCoupon.id;
            }
        }
        const order_resp = await prisma.order.create({
            data: {
                vendor_user_id: getCart.vendor_user_id,
                customer_user_id: AuthUser(req).id,
                reference: `${AuthUser(req).id}${generateRandomString(20)}`,
                coupon_id: _coupon_id,
                deliveryTime: body.delivery_time !== undefined ? new Date(body.delivery_time) : undefined,
                total_price: total_price,
                discounted_price: discounted_price,
                status: ORDER_STATUS.PENDING
            }
        })
        for (let i = 0; i < getCartItems.length; i++) {
            await prisma.orderItem.create({
                data: {
                    order_id: order_resp.id,
                    menu_id: getCartItems[i].menu_id, 
                    name: getCartItems[i].name, 
                    description: getCartItems[i].description, 
                    price: getCartItems[i].price, 
                    wait_time: getCartItems[i].wait_time, 
                    quantity: getCartItems[i].quantity
                }
            })
        }
        await prisma.orderDeliveryAddress.create({
            data: {
                order_id: order_resp.id,
                fullname: getAddress.fullname,
                phone: getAddress.phone,
                street: getAddress.fullname,
                city: getAddress.city,
                postal_code: getAddress.postal_code,
                state: getAddress.state,
                country: getAddress.country,
                location_description: getAddress.location_description,
                long: getAddress.long,
                lat: getAddress.lat
            }
        })

        await clearCart(req);

        return order_resp;

    }
}

export async function clearCart(req: Request) {
    await prisma.cart.deleteMany({
        where: { customer_user_id: AuthUser(req).id }
    })
    await prisma.cartItem.deleteMany({
        where: { customer_user_id: AuthUser(req).id }
    })
    return "Cart cleared successfully";
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