import { baseApi } from '@/redux/base-api';
import { IUser } from '@/types/type-user';

interface ILoginPayload {
    email: string;
    password: string;
}

interface ILoginResponse {
    message: string | null;
    accessToken?: string | null;
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
        getUserInfo: builder.query<IUser, void>({
            query: () => ({
                url: '/admin/get-info',
                method: 'GET'
            }),
            keepUnusedDataFor: 0
        })
    })
});
export const { useLoginMutation, useGetUserInfoQuery } = loginApi;
