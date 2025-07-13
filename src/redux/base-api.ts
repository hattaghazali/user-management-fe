import {
    createApi,
    FetchArgs,
    BaseQueryApi
} from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CONST_API_BASE } from '@/configs/constants';
import { clearAccessToken } from '@/redux/features/auth/auth-slice';

interface IRootState {
    auth: {
        token?: string;
    };
}

interface IApiErrorResponse {
    success?: boolean;
    message: string;
}

interface IBaseQueryExtraOptions {}

const baseQuery = fetchBaseQuery({
    baseUrl: CONST_API_BASE,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithAuth = async (
    args: FetchArgs | string,
    api: BaseQueryApi,
    extraOptions: IBaseQueryExtraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && (result.error as FetchBaseQueryError).status === 401) {
        api.dispatch(clearAccessToken());
        const errorData = result.error.data as IApiErrorResponse | undefined;
        if (
            !errorData ||
            typeof errorData !== 'object' ||
            !('message' in errorData)
        ) {
            // Fallback if backend response is malformed
            result.error.data = {
                success: false,
                message: 'Authentication error occurred.'
            } as IApiErrorResponse;
        }
        // Use backend's message directly (e.g., "Invalid or missing Authorization header")
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Users', 'Demographics', 'Auth'],
    endpoints: () => ({})
});

export default baseApi;
