import { Request } from "express";
import prisma from "../../../prisma.config.js";
import AuthUser from "../../utils/authUser.js";
import { IAccountBioSchema, IAddAddressInfoSchema, IUpdateAddressInfoSchema } from "../../types/validations/customer.types.js";
import { Client as GoogleMapClient } from "@googlemaps/google-maps-services-js";
import { BadRequestError } from "../../utils/errors.js";

export async function getAccountBio(req: Request) {
    const resp = await prisma.user.findFirst({
        where: { id: AuthUser(req).id },
        select: {
            email: true,
            phone: true,
            customer_account: {
                select: {
                    firstname: true,
                    lastname: true,
                    profile_image: true,
                    addresses: true
                }
            },
        }
    });
    return resp;
}

export async function getAddresses(req: Request) {
    const resp = await prisma.address.findMany({
        where: { customer_user_id: AuthUser(req).id },
        select: {
            id: true,
            fullname: true,
            city: true,
            street: true,
            postal_code: true,
            state: true,
            country: true,
            long: true,
            lat: true,
            phone: true,
            isPrimary: true,
            created_at: true,
            updated_at: true
        }
    });
    return resp;
}

export async function addAddressInfo(req: Request, body: IAddAddressInfoSchema) {
    const mapClient = new GoogleMapClient({});
    const geocodeQuery = await mapClient.geocode({
        params: {
            key: process.env.GOOGLE_MAP_API_KEY as string,
            address: `${body.street}, ${body.city}, ${body.state}, ${body.country}, ${body.postal_code}`
        }
    });
    const geocodeLocation = geocodeQuery.data.results[0].geometry.location;
    const resp = await prisma.address.create({
        data: {
            customer_user_id: AuthUser(req).id,
            fullname: body.fullname,
            city: body.city,
            phone: body.phone,
            state: body.state,
            street: body.street,
            postal_code: body.postal_code,
            country: body.country,
            long: geocodeLocation.lng,
            lat: geocodeLocation.lat
        }
    });

    return resp;
}

export async function updatAddressInfo(req: Request, body: IUpdateAddressInfoSchema) {

    const getContactInfo = await prisma.address.findFirst({ where: { customer_user_id: AuthUser(req).id, id: parseInt(body.address_id) } });
    if (!getContactInfo) throw new BadRequestError("Invalid address id")
    const mapClient = new GoogleMapClient({});
    const geocodeQuery = await mapClient.geocode({
        params: {
            key: process.env.GOOGLE_MAP_API_KEY as string,
            address: `${body.street}, ${body.city}, ${body.state}, ${body.country}, ${body.postal_code}`
        }
    });
    const geocodeLocation = geocodeQuery.data.results[0].geometry.location;
    const resp = await prisma.address.update({
        where: { id: getContactInfo.id },
        data: {
            fullname: body.fullname,
            city: body.city,
            phone: body.phone,
            state: body.state,
            street: body.street,
            postal_code: body.postal_code,
            country: body.country,
            long: geocodeLocation.lng,
            lat: geocodeLocation.lat
        }
    });

    return resp;

}

export async function updateAccountBio(req: Request, body: IAccountBioSchema) {
    const _getAccountInfoRaw = await getAccountInfoRaw(req);
    const resp = await prisma.customerAccount.update({
        where: { id: _getAccountInfoRaw?.customer_account?.id },
        data: {
            firstname: body.firstname,
            lastname: body.lastname
        }
    });
    return resp;
}

export async function logout(req: Request) {
    const bearerTokenFromRequestHeader = (req.headers.authorization || '').split(' ')[1];// retrieve access token
    const accessToken = await prisma.accessToken.findFirst({ where: { user_id: AuthUser(req).id, token: bearerTokenFromRequestHeader } });
    await prisma.accessToken.delete({ where: { user_id: AuthUser(req).id, id: accessToken?.id } })
}

async function getAccountInfoRaw(req: Request) {
    const resp = await prisma.user.findFirst({
        where: { id: AuthUser(req).id },
        select: {
            id: true,
            email: true,
            phone: true,
            customer_account: true,
        }
    });
    return resp;
}