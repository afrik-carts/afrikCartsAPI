import { Request } from "express";
import prisma from "../../../prisma.config.js";
import AuthUser from "../../utils/authUser.js";
import { IAccountBioSchema, IAddressSchema } from "../../types/validations/vendor.types.js";
import {Client as GoogleMapClient} from "@googlemaps/google-maps-services-js";

export async function getAccountBio(req: Request) {
    const resp = await prisma.user.findFirst({
        where: { id: AuthUser(req).id },
        select: {
            email: true,
            phone: true,
            vendor_account: {
                select: {
                    name: true,
                    description: true,
                    opening_time: true,
                    closing_time: true,
                    is_open_24hours: true,
                    cover_image: true,
                    profile_image: true,
                    menu_categories: true,
                    address: true,
                    wallet: {
                        select: {
                            available_balance: true,
                            currency: true
                        }
                    }
                }
            },
        }
    });
    return resp;
}

export async function getContactInfo(req: Request) {
    const resp = await prisma.address.findFirst({
        where: { vendor_user_id: AuthUser(req).id },
        select: {
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

export async function updateContactInfo(req: Request, body: IAddressSchema) {
    
    const getContactInfo = await prisma.address.findFirst({ where: { vendor_user_id: AuthUser(req).id } });
    const mapClient = new GoogleMapClient({});
    const geocodeQuery = await mapClient.geocode({
        params: {
            key: process.env.GOOGLE_MAP_API_KEY as string,
            address: `${body.street}, ${body.city}, ${body.state}, ${body.country}, ${body.postal_code}`
        }
    });
    const geocodeLocation = geocodeQuery.data.results[0].geometry.location;
    if (getContactInfo) {
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
    } else {
        const resp = await prisma.address.create({
            data: {
                vendor_user_id: AuthUser(req).id,
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

    // will remove this part when i implement verifying/approving vendor by legal_identifier from admin
    // for now when the vendor updates there address (i.e has an address) they will be verified/approved
    const _getAccountInfoRaw = await getAccountInfoRaw(req);
    if (_getAccountInfoRaw && !_getAccountInfoRaw?.vendor_account?.is_approved) {
        await prisma.vendorAccount.update({
            where: {id: _getAccountInfoRaw?.vendor_account?.id},
            data: {is_approved: true}
        })
    }

}

export async function updateAccountBio(req: Request, body: IAccountBioSchema) {
    const _getAccountInfoRaw = await getAccountInfoRaw(req);
    const resp = await prisma.vendorAccount.update({
        where: { id: _getAccountInfoRaw?.vendor_account?.id },
        data: {
            name: body.name,
            description: body.description,
            opening_time: body.opening_time,
            closing_time: body.closing_time,
        }
    });
    return resp;
}

export async function logout(req:Request) {
    const bearerTokenFromRequestHeader = (req.headers.authorization || '').split(' ')[1];// retrieve access token
    const accessToken = await prisma.accessToken.findFirst({ where: { user_id: AuthUser(req).id, token: bearerTokenFromRequestHeader } });
    await prisma.accessToken.delete({ where: { user_id: AuthUser(req).id, id: accessToken?.id } })
}

async function getAccountInfoRaw(req: Request) {
    const resp = await prisma.user.findFirst({
        where: { id: AuthUser(req).id },
        select: {
            id:true,
            email: true,
            phone: true,
            vendor_account: true,
        }
    });
    return resp;
}