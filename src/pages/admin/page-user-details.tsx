import { useGetAUserDetailsQuery } from '@/redux/features/users/user-api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    stateMap,
    statusMap,
    occupationMap,
    genderMap
} from '@/types/type-user';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Loader2,
    ArrowLeft,
    User,
    Mail,
    MapPin,
    Calendar,
    Edit,
    Trash2,
    AlertTriangle
} from 'lucide-react';
import HeaderSection from '@/components/ui/header-section';
import { IAPIError } from '@/types/type-api';

const PageUserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Handle case where id is undefined
    if (!id) {
        return (
            <div className='flex min-h-[400px] items-center justify-center'>
                <Card className='w-full max-w-md'>
                    <CardHeader>
                        <CardTitle className='text-destructive flex items-center gap-2'>
                            <AlertTriangle className='h-5 w-5' />
                            Invalid Request
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <p className='text-muted-foreground'>
                            No user ID provided. Please select a valid user.
                        </p>
                        <Button
                            onClick={() => navigate('/admin/users')}
                            className='w-full'
                        >
                            <ArrowLeft className='mr-2 h-4 w-4' />
                            Back to Users List
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { data: user, isLoading, error } = useGetAUserDetailsQuery(id);

    // Loading State
    if (isLoading) {
        return (
            <>
                <HeaderSection
                    title='User Details'
                    desc='Loading user information...'
                />
                <div className='flex min-h-[400px] items-center justify-center'>
                    <div className='text-center'>
                        <Loader2 className='text-primary mx-auto h-8 w-8 animate-spin' />
                        <p className='text-muted-foreground mt-2'>
                            Loading user details...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    // Error State
    if (error || !user) {
        return (
            <>
                <HeaderSection
                    title='User Details'
                    desc='Error loading user information'
                />
                <div className='flex min-h-[400px] items-center justify-center'>
                    <Card className='w-full max-w-md'>
                        <CardHeader>
                            <CardTitle className='text-destructive flex items-center gap-2'>
                                <AlertTriangle className='h-5 w-5' />
                                Error Loading User
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <p className='text-muted-foreground'>
                                {error && 'data' in error
                                    ? (error.data as IAPIError).message
                                    : 'Failed to load user details. The user may not exist or there was a network error.'}
                            </p>
                            <div className='flex gap-2'>
                                <Button
                                    variant='outline'
                                    onClick={() => window.location.reload()}
                                    className='flex-1'
                                >
                                    Try Again
                                </Button>
                                <Button
                                    onClick={() =>
                                        navigate('/admin/users-list')
                                    }
                                    className='flex-1'
                                >
                                    <ArrowLeft className='mr-2 h-4 w-4' />
                                    Back to List
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    // Helper function to get user initials for avatar
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Helper function to format dates
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Helper function to get status badge variant
    const getStatusBadgeVariant = (status: number) => {
        switch (status) {
            case 1:
                return 'default'; // Active
            case 2:
                return 'destructive'; // Inactive
            default:
                return 'secondary';
        }
    };

    return (
        <>
            <HeaderSection
                title={`User: ${user.name || 'Unknown User'}`}
                desc={`Details for user ID: ${user._id}`}
            />

            <div className='flex flex-1 flex-col gap-6 p-6'>
                {/* Navigation */}
                <div className='flex items-center justify-between'>
                    <Button
                        variant='outline'
                        onClick={() => navigate('/admin/users')}
                        className='gap-2'
                    >
                        <ArrowLeft className='h-4 w-4' />
                        Back to Users List
                    </Button>

                    <div className='flex gap-2'>
                        <Button variant='outline' className='gap-2'>
                            <Edit className='h-4 w-4' />
                            <Link to={`/admin/users/${user._id}/edit`}>
                                Edit User
                            </Link>
                        </Button>
                        <Button variant='destructive' className='gap-2'>
                            <Trash2 className='h-4 w-4' />
                            Delete User
                        </Button>
                    </div>
                </div>

                <div className='mx-auto w-full max-w-4xl'>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {/* User Profile Card */}
                        <div className='md:col-span-1'>
                            <Card className='sticky top-6'>
                                <CardHeader className='text-center'>
                                    <div className='mx-auto mb-4'>
                                        <Avatar className='h-24 w-24'>
                                            <AvatarImage
                                                src={user.avatar?.img_url}
                                                alt={user.name || 'User'}
                                            />
                                            <AvatarFallback className='text-lg font-semibold'>
                                                {getUserInitials(
                                                    user.name || 'UN'
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <CardTitle className='text-lg'>
                                        {user.name || 'No Name Provided'}
                                    </CardTitle>
                                    <CardDescription>
                                        {user.occupation
                                            ? occupationMap[user.occupation]
                                            : 'Not specified'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='space-y-3 text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <Mail className='text-muted-foreground h-4 w-4' />
                                            <span className='font-medium'>
                                                Email:
                                            </span>
                                        </div>
                                        <p className='text-muted-foreground ml-6 break-all'>
                                            {user.email || 'No email provided'}
                                        </p>

                                        <div className='mt-4 flex items-center gap-2'>
                                            <User className='text-muted-foreground h-4 w-4' />
                                            <span className='font-medium'>
                                                User ID:
                                            </span>
                                        </div>
                                        <p className='text-muted-foreground ml-6 font-mono text-xs break-all'>
                                            {user._id}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* User Details Card */}
                        <div className='md:col-span-2'>
                            <div className='bg-card space-y-1 rounded-xl border'>
                                {/* Personal Information */}
                                <Card className='border-0 bg-transparent'>
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-2'>
                                            <User className='h-5 w-5' />
                                            Personal Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='grid gap-4 sm:grid-cols-2'>
                                            <div className='space-y-2'>
                                                <label className='text-muted-foreground text-sm font-medium'>
                                                    Full Name
                                                </label>
                                                <p className='font-medium'>
                                                    {user.name ||
                                                        'Not provided'}
                                                </p>
                                            </div>

                                            <div className='space-y-2'>
                                                <label className='text-muted-foreground text-sm font-medium'>
                                                    Gender
                                                </label>
                                                <p className='font-medium'>
                                                    {user.gender
                                                        ? genderMap[user.gender]
                                                        : 'Not specified'}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Separator />
                                {/* Location & Work Information */}
                                <Card className='border-0 bg-transparent'>
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-2'>
                                            <MapPin className='h-5 w-5' />
                                            Location & Work
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='grid gap-4 sm:grid-cols-2'>
                                            <div className='space-y-2'>
                                                <label className='text-muted-foreground text-sm font-medium'>
                                                    State
                                                </label>
                                                <p className='font-medium'>
                                                    {user.state
                                                        ? stateMap[user.state]
                                                        : 'Not specified'}
                                                </p>
                                            </div>

                                            <div className='space-y-2'>
                                                <label className='text-muted-foreground text-sm font-medium'>
                                                    Occupation
                                                </label>
                                                <div className='flex items-center gap-2'>
                                                    <p className='font-medium'>
                                                        {user.occupation
                                                            ? occupationMap[
                                                                  user
                                                                      .occupation
                                                              ]
                                                            : 'Not specified'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Separator />
                                {/* Account Information */}
                                <Card className='border-0 bg-transparent'>
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-2'>
                                            <Calendar className='h-5 w-5' />
                                            Account Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='grid gap-4'>
                                            <div className='space-y-2'>
                                                <label className='text-muted-foreground text-sm font-medium'>
                                                    Account Status
                                                </label>
                                                <div className='flex items-center gap-2'>
                                                    <Badge
                                                        variant={getStatusBadgeVariant(
                                                            user.status
                                                        )}
                                                        className='w-fit'
                                                    >
                                                        {statusMap[
                                                            user.status
                                                        ] || 'Unknown Status'}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className='grid gap-4 sm:grid-cols-2'>
                                                <div className='space-y-2'>
                                                    <label className='text-muted-foreground text-sm font-medium'>
                                                        Created At
                                                    </label>
                                                    <p className='text-sm'>
                                                        {formatDate(
                                                            user.createdAt
                                                        )}
                                                    </p>
                                                </div>

                                                <div className='space-y-2'>
                                                    <label className='text-muted-foreground text-sm font-medium'>
                                                        Last Updated
                                                    </label>
                                                    <p className='text-sm'>
                                                        {formatDate(
                                                            user.updatedAt
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageUserDetails;
