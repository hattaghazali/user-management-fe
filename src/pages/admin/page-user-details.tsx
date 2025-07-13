import { useGetAUserDetailsQuery } from '@/redux/features/users/user-api';
import { useParams, Link } from 'react-router-dom';
import {
    stateMap,
    statusMap,
    occupationMap,
    genderMap
} from '@/types/type-user';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import HeaderSection from '@/components/ui/header-section';

const PageUserDetails = () => {
    const { id } = useParams<{ id: string }>();

    // Handle case where id is undefined
    if (!id) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-red-500'>Invalid user ID</p>
                        <Link to='/admin/users-list'>
                            <Button className='mt-4'>Back to Users List</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { data: user, isLoading, error } = useGetAUserDetailsQuery(id);

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-red-500'>
                            {'data' in error
                                ? (error.data as { message: string }).message
                                : error
                                  ? 'Failed to load user details'
                                  : 'User not found'}
                        </p>
                        <Link to='/admin/users-list'>
                            <Button className='mt-4'>Back to Users List</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <HeaderSection
                title='User Details'
                desc='This is a user details page'
            />
            <div className='flex flex-1 flex-col px-4 py-6'>
                <div className='mx-auto w-full max-w-2xl'>
                    <Link to='/admin/users-list'>
                        <Button variant='outline' className='mb-6'>
                            Back to Users List
                        </Button>
                    </Link>
                    <Card>
                        <CardHeader>
                            <CardTitle>User Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div>
                                    <h3 className='font-semibold'>User ID</h3>
                                    <p>{user._id}</p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Email</h3>
                                    <p>{user.u_email}</p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Name</h3>
                                    <p>{user.u_name}</p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Gender</h3>
                                    <p>
                                        {genderMap[user.u_gender] || 'Unknown'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>
                                        Occupation
                                    </h3>
                                    <p>
                                        {occupationMap[user.u_occupation] ||
                                            'Unknown'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>State</h3>
                                    <p>{stateMap[user.u_state] || 'Unknown'}</p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Status</h3>
                                    <p>
                                        {statusMap[user.u_status] || 'Unknown'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>
                                        Created At
                                    </h3>
                                    <p>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className='font-semibold'>
                                        Updated At
                                    </h3>
                                    <p>
                                        {new Date(
                                            user.updatedAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default PageUserDetails;
