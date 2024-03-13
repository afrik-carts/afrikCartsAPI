import { Request, Response } from "express"
import { vendorAccountServices } from "../../services/vendor/index.js"
import { ValidationError, handleResponseError } from "../../utils/errors.js"
import { vendorAccountValidations } from "../../validations/vendor/index.js";

export async function getAccountBio(req: Request, res: Response) {
    try {
        const resp = await vendorAccountServices.getAccountBio(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateAccountBio(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorAccountValidations.accountBio(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorAccountServices.updateAccountBio(req, value);
        return res.json({message: "Account updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getContactInfo(req: Request, res: Response) {
    try {
        const resp = await vendorAccountServices.getContactInfo(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateContactInfo(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorAccountValidations.contactInfo(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorAccountServices.updateContactInfo(req, value);
        return res.json({message: "Contact information updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function logout(req: Request, res: Response) {
    try {
        await vendorAccountServices.logout(req);
        return res.json({message: "Logout successful", data: {}});
    } catch (error) {
        return handleResponseError(res, error)
    }
}