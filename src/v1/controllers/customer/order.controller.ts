import { Request, Response } from "express"
import { customerOrderServices } from "../../services/customer/index.js"
import { ValidationError, handleResponseError } from "../../utils/errors.js"
import { customerOrderValidations } from "../../validations/customer/index.js";

export async function getOrder(req: Request, res: Response) {
    try {
        const resp = await customerOrderServices.getOrder(req, req.params.id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getAllOrders(req: Request, res: Response) {
    try {
        const resp = await customerOrderServices.getAllOrders(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getOrdersByStatus(req: Request, res: Response) {
    try {
        const resp = await customerOrderServices.getOrdersByStatus(req, req.params.status);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getCart(req: Request, res: Response) {
    try {
        const resp = await customerOrderServices.getCart(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function addItemToCart(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = customerOrderValidations.addItemToCart(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await customerOrderServices.addItemToCart(req, value);
        return res.json({message: "Item added to cart", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}


export async function removeItemFromCart(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = customerOrderValidations.removeItemFromCart(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await customerOrderServices.removeItemFromCart(req, value);
        return res.json({message: "Item removed from cart", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}


export async function placeOrder(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = customerOrderValidations.placeOrder(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await customerOrderServices.placeOrder(req, value);
        return res.json({message: "Oder Status updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function clearCart(req: Request, res: Response) {
    try {
        const resp = await customerOrderServices.clearCart(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}