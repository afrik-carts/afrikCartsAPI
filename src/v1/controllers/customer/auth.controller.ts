import prisma from "../../../prisma.config.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import { customerAuthValidations } from "../../validations/customer/index.js";
import { ROLE } from "@prisma/client";
import { BadRequestError, ValidationError, handleResponseError } from "../../utils/errors.js";

/**
 * @dev Register a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const register = async (req: Request, res: Response) => {
    try {
        // @dev Validate request body
        const { error } = customerAuthValidations.register(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        // @dev Check if email exists. If email exists, return an error
        const checkEmailExist = await prisma.user.findFirst({
            where: { email: req.body.email }
        });
        if (checkEmailExist) throw new BadRequestError("Email already exists");

        // @dev Hash the password
        const hashPass = await bcrypt.hash(req.body.password, 10);

        // @dev Register the user
        const createdUser = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashPass,
                customer_account: {
                    create: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    }
                },
                role: ROLE.CUSTOMER
            }
        });

        // @dev Create the customer account
        const createdAccount = await prisma.customerAccount.findUnique({
            where: { user_id: createdUser.id }
        });

        // @dev Create a wallet for the registered user
        await prisma.accountWallet.create({
            data: {
                customer_user_id: createdUser.id
            }
        });

        // @dev Create a JWT token for the user
        const jwtToken = jsonwebtoken.sign({ id: createdUser.id, email: createdUser.email }, process.env.APP_SECRET!);

        // @dev Calculate the expiration time for the token
        const _currentDateTime = new Date(); // Get the current date and time
        const _expirationTime = new Date(_currentDateTime.getTime() + (5 * 60 * 60 * 1000));

        // @dev Add the token to the database and specify the expiration time
        await prisma.accessToken.create({
            data: {
                user_id: createdUser.id,
                token: jwtToken,
                expires_at: _expirationTime
            }
        });

        // @dev Return the token and user data back to the client
        return res.json({
            message: "registration successfull",
            data: {
                user: {
                    firstname: createdAccount?.firstname,
                    lastname: createdAccount?.lastname,
                    email: createdUser.email
                },
                token: jwtToken
            }
        });
    } catch (error) {
        // @dev Catch any error in the process
        return handleResponseError(res, error);
    }
};

/**
 * @dev Login an existing user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const login = async (req: Request, res: Response) => {
    try {
        // @dev Validate request body
        const { error } = customerAuthValidations.login(req.body);
        if (error) throw new ValidationError(undefined, error.details);

        // @dev Check if email exists. If email exists, throw an error
        const _user = await prisma.user.findFirst({
            where: { email: req.body.email },
            include: {customer_account: true}
        });
        if (!_user) throw new BadRequestError("Invalid login credentials");

        // @dev check if user has role of CUSTOMER
        if (_user.role !== ROLE.CUSTOMER) throw new BadRequestError("Invalid login credentials");

        // @dev check if password match
        const checkPassword = await bcrypt.compare(req.body.password, _user!.password)
        if (!checkPassword) throw new BadRequestError("Invalid login credentials");

        // @dev Create a JWT token for the user
        const jwtToken = jsonwebtoken.sign({ id: _user.id, email: _user.email }, process.env.APP_SECRET!);

        // @dev Calculate the expiration time for the token
        const _currentDateTime = new Date(); // Get the current date and time
        const _expirationTime = new Date(_currentDateTime.getTime() + 2 * 60 * 60 * 1000);

        // @dev Add the token to the database and specify the expiration time
        await prisma.accessToken.create({
            data: {
                user_id: _user.id,
                token: jwtToken,
                expires_at: _expirationTime
            }
        });

        // @dev Return the token and user data back to the client
        return res.json({
            message: "login successfull",
            data: {
                user: {
                    firstname: _user.customer_account!.firstname,
                    lastname: _user.customer_account!.lastname,
                    email: _user.email
                },
                token: jwtToken
            }
        });
    } catch (error) {
        // @dev Catch any error in the process
        return handleResponseError(res, error);
    }
};

// export const logout = async (req: Request, res: Response) => {}
