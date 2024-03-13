import { Request, Response } from "express"
import { customerAccountServices } from "../../services/customer/index.js"
import { ValidationError, handleResponseError } from "../../utils/errors.js"
import { customerAccountValidations } from "../../validations/customer/index.js";

export async function getAccountBio(req: Request, res: Response) {
    try {
        const resp = await customerAccountServices.getAccountBio(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateAccountBio(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = customerAccountValidations.accountBio(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await customerAccountServices.updateAccountBio(req, value);
        return res.json({message: "Account updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getAddresses(req: Request, res: Response) {
    try {
        const resp = await customerAccountServices.getAddresses(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function addAddressInfo(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = customerAccountValidations.addAddressInfo(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await customerAccountServices.addAddressInfo(req, value);
        return res.json({message: "Contact information added", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateAddressInfo(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = customerAccountValidations.updateAddressInfo(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await customerAccountServices.updatAddressInfo(req, value);
        return res.json({message: "Contact information updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function logout(req: Request, res: Response) {
    try {
        await customerAccountServices.logout(req);
        return res.json({message: "Logout successful", data: {}});
    } catch (error) {
        return handleResponseError(res, error)
    }
}