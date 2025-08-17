import { baseApi } from '@/redux/base-api';
import { IAPIParams, IAPIResponse, ICreateUserPayload } from '@/types/type-api';
import { IUser } from '@/types/type-user';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // START: API User Demographic
        getUsers: builder.query<IAPIResponse<IUser[]>, IAPIParams>({
            query: ({
                page = 1,
                name,
                states,
                occupation,
                status,
                gender,
                dateFrom,
                dateTo
            }) => ({
                method: 'GET',
                url: `/admin/user/list-users?page=${page}&name=${name}&states=${states}&occupation=${occupation}&status=${status}&gender=${gender}&dateFrom=${dateFrom}&dateTo=${dateTo}`
            }),
            keepUnusedDataFor: 0
        }),
        // START: API Admin Create A User
        createAUser: builder.mutation<IAPIResponse<null>, ICreateUserPayload>({
            query: (payload) => ({
                url: '/admin/user/register-user',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Users'] // Invalidate Users tag to refresh user list if needed
        }),
        // START: API Admin View A User Details
        getAUserDetails: builder.query<IUser, string>({
            query: (id) => ({
                method: 'GET',
                url: `/admin/user/${id}`
            }),
            keepUnusedDataFor: 0,
            providesTags: (_, __, id) => [{ type: 'Users', id }]
        }),
        // START: API Admin Edit A User Details
        editAUserInfo: builder.mutation<
            IAPIResponse<IUser>,
            { id: string; payload: Partial<IUser> }
        >({
            query: ({ id, payload }) => ({
                url: `/admin/user/edit/${id}`,
                method: 'PATCH',
                body: payload
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Users', id }]
        }),
        // START: API Admin Edit A User Image
        editUserImage: builder.mutation<
            { user: IUser },
            { id: string; imageFile: File }
        >({
            query: ({ id, imageFile }) => {
                const formData = new FormData();
                formData.append('pictureFile', imageFile);

                return {
                    url: `/admin/user/edit-image/${id}`,
                    method: 'PUT',
                    body: formData,
                    // Don't set Content-Type header - let the browser set it with boundary
                    formData: true
                };
            },
            invalidatesTags: (_, __, { id }) => [{ type: 'Users', id }]
        })
    }),
    overrideExisting: false
});

export const {
    useGetUsersQuery,
    useCreateAUserMutation,
    useGetAUserDetailsQuery,
    useEditAUserInfoMutation,
    useEditUserImageMutation
} = usersApi;
