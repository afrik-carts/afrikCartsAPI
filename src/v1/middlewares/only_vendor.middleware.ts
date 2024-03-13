import { NextFunction, Request, Response } from "express";
import passport from "./passport-config.js";
import { BadRequestError, UnauthorizedError, handleResponseError } from "../utils/errors.js";
import { ROLE } from "@prisma/client";
import prisma from "../../prisma.config.js";
import { IAuthRequestUser } from "../types/global.types.js";

const only_logistic = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, async (err: unknown, user: IAuthRequestUser) => {
        // validate passport user payload
        try {
            if (err) {
                throw new BadRequestError("An error occurred during authentication")
            }
            if (!user) {
                throw new UnauthorizedError()
            }
            // validate access token
            const bearerTokenFromRequestHeader = (req.headers.authorization || '').split(' ')[1];
            if (!bearerTokenFromRequestHeader) throw new UnauthorizedError()
            // retrieve access token
            const accessToken = await prisma.accessToken.findFirst({ where: { user_id: user.id, token: bearerTokenFromRequestHeader } });
            if (!accessToken) throw new UnauthorizedError("invalid or expired access token");
            // calidate token expiry date
            const currentDate = new Date();
            const tokenExpirationDate = new Date(`${accessToken?.expires_at}`);
            if (tokenExpirationDate.getTime() <= currentDate.getTime()) {
                await prisma.accessToken.delete({ where: { user_id: user.id, id: accessToken.id } })
                throw new UnauthorizedError("invalid or expired access token");
            }
            // check role
            if (user.role !== ROLE.VENDOR) {
                throw new UnauthorizedError("Forbidden: Unauthorized")
            }
            req.user = user;
        } catch (error) {
            return handleResponseError(res, error);
        }
        next();
    })(req, res, next);
}

export default only_logistic;