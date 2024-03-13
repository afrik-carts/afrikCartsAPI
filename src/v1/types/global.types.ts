import { ROLE } from "@prisma/client";

export type ORDER_STATUS_TYPE = "declined" | "pending" | "paid" | "confirmed" | "preparing" | "ready" | "delivering" | "delivered";
export type CATEGORY_TYPE = "food" | "groceries"

export interface IResourceBuilder<T> {
    data: T | T[],
    meta_data?: {
        pagination?: {
            current_page: number;
            total_pages: number;
            result_per_page?: number;
            total_result: number;
        }
        readonly version: string;
        description?: string;
    }
}

export type IAuthRequestUser = {
    id: number,
    role: ROLE
}
