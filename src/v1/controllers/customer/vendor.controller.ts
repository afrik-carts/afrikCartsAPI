import { Request, Response } from "express"
import { customerVendorServices } from "../../services/customer/index.js"
import { handleResponseError } from "../../utils/errors.js"

export async function getVendorById(req: Request, res: Response) {
    try {
        const resp = await customerVendorServices.getVendorById(req, req.params.id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getVendors(req: Request, res: Response) {
    try {
        const resp = await customerVendorServices.getVendors(req, req.params.category);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getMenuById(req: Request, res: Response) {
    try {
        const resp = await customerVendorServices.getMenuById(req, req.params.id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}