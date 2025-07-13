import { baseApi } from '@/redux/base-api';

interface ILoginPayload {
    email: string;
    password: string;
}

interface ILoginResponse {
    message: string | null;
    accessToken?: string | null;
}

interface IUserInfoResponse {
    _id: string;
    u_email: string;
    u_name: string;
    u_gender: number;
    u_occupation: number;
    u_state: number;
    u_status: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginPayload>({
            query: (credentials) => ({
                url: '/admin/login',
                method: 'POST',
                body: credentials
            })
        }),
        getUserInfo: builder.query<IUserInfoResponse, void>({
            query: () => ({
                url: '/admin/get-info',
                method: 'GET'
            }),
            keepUnusedDataFor: 0
        })
    })
});
export const { useLoginMutation, useGetUserInfoQuery } = loginApi;
