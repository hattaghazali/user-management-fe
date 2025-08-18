import { baseApi } from '@/redux/base-api';
import { IUserReduced } from '@/types/type-user';

interface IDemographicResponse {
    success: boolean;
    total_users: number;
    total_male: number;
    total_female: number;
    total_occupation_student: number;
    total_occupation_employ: number;
    graph: {
        month: string;
        male_user: number;
        female_user: number;
    }[];
    recent_users: IUserReduced[];
}

interface IDemographicParams {
    date_from: string;
    date_to: string;
}

export const demographicApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDemographic: builder.query<IDemographicResponse, IDemographicParams>(
            {
                query: ({ date_from, date_to }) => ({
                    method: 'GET',
                    url: '/admin/demographics',
                    params: { date_from, date_to }
                }),
                keepUnusedDataFor: 0
            }
        )
    })
});
export const { useGetDemographicQuery } = demographicApi;
