import { Request, Response } from "express"
import { ValidationError, handleResponseError } from "../../utils/errors.js";
import { vendorOrderServices } from "../../services/vendor/index.js";
import { vendorOrderValidations } from "../../validations/vendor/index.js";

export async function getOrder(req: Request, res: Response) {
    try {
        const resp = await vendorOrderServices.getOrder(req, req.params.id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getAllOrders(req: Request, res: Response) {
    try {
        const resp = await vendorOrderServices.getAllOrders(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getOrdersByStatus(req: Request, res: Response) {
    try {
        const resp = await vendorOrderServices.getOrdersByStatus(req, req.params.status);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateOrderStatus(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorOrderValidations.orderStatusUpdate(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorOrderServices.updateOrderStatus(req, value);
        return res.json({message: "Oder Status updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}