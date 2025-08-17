import { IUser } from './type-user';

export interface IAPIError {
    success: false;
    message: string;
}

export interface IAPIResponse<T> {
    results: T;
    message?: string;
    pagination?: {
        currentPage: number;
        totalPages: number;
        limit: number;
        totalItems: number;
    };
}

export interface ICreateUserPayload
    extends Omit<
        IUser,
        '_id' | 'createdAt' | 'updatedAt' | 'status' | 'avatar'
    > {}

export interface IAPIParams {
    page?: number;
    name?: string;
    states?: string;
    occupation?: string;
    status?: string;
    gender?: string;
    dateFrom?: string;
    dateTo?: string;
}
