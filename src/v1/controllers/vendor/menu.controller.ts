import { Request, Response } from "express"
import { vendorMenuServices } from "../../services/vendor/index.js"
import { ValidationError, handleResponseError } from "../../utils/errors.js"
import { vendorMenuValidations } from "../../validations/vendor/index.js";

export async function getMenuCategories(req: Request, res: Response) {
    try {
        const resp = await vendorMenuServices.getMenuCategories(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getMenusByCategoryId(req: Request, res: Response) {
    try {
        const resp = await vendorMenuServices.getMenusByCategoryId(req, req.params.category_id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function deleteMenu(req: Request, res: Response) {
    try {
        const resp = await vendorMenuServices.deleteMenu(req, req.params.menu_id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function getMenus(req: Request, res: Response) {
    try {
        const resp = await vendorMenuServices.getMenus(req);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateMenu(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorMenuValidations.updateMenu(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorMenuServices.updateMenu(req, value);
        return res.json({message: "Oder Status updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function addMenu(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorMenuValidations.addMenu(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorMenuServices.addMenu(req, value);
        return res.json({message: "Oder Status updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function updateMenuCategory(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorMenuValidations.updateMenuCategory(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorMenuServices.updateMenuCategory(req, value);
        return res.json({message: "Oder Status updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function addMenuCategory(req: Request, res: Response) {
    try {
        // @dev Validate request body
        const { error, value } = vendorMenuValidations.addMenuCategory(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        const resp = await vendorMenuServices.addMenuCategory(req, value);
        return res.json({message: "Oder Status updated", data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}

export async function deleteMenuCategory(req: Request, res: Response) {
    try {
        const resp = await vendorMenuServices.deleteMenuCategory(req, req.params.menu_category_id);
        return res.json({data: resp});
    } catch (error) {
        return handleResponseError(res, error)
    }
}