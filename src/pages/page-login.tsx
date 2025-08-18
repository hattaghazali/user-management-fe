import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/lib-validation';

import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    useLoginMutation,
    useGetUserInfoQuery
} from '@/redux/features/auth/auth-api';
import { setAccessToken, setUserInfo } from '@/redux/features/auth/auth-slice';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PageLogin = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const userInfoFromState = useSelector(
        (state: RootState) => state.auth.userInfo
    );

    // Trigger getUserInfo only when token is set
    const {
        data: userInfo,
        isLoading: isUserInfoLoading,
        error: userInfoError
    } = useGetUserInfoQuery(undefined, {
        skip: !token // Only fetch when token exists
    });

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Handle user info fetch and navigation
    useEffect(() => {
        if (userInfo) {
            dispatch(setUserInfo(userInfo));
            navigate('/admin/home', { replace: true });
        }
        if (userInfoError) {
            const errorData = (userInfoError as any)?.data as
                | { message?: string }
                | undefined;
            setErrorMessage(
                errorData?.message ||
                    'Failed to fetch user info. Please try again.'
            );
        }
    }, [userInfo, userInfoError, dispatch, navigate]);

    // Redirect if already logged in and user info is available
    if (token && userInfoFromState) {
        return <Navigate to='/admin/home' replace />;
    }

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            setErrorMessage(null); // Clear previous errors
            const response = await login(values).unwrap();
            if (response.accessToken) {
                dispatch(setAccessToken(response.accessToken));
                // The getUserInfo query will trigger automatically due to the token change
            }
        } catch (error: any) {
            const errorData = error?.data as { message?: string } | undefined;
            setErrorMessage(
                errorData?.message || 'Login failed. Please try again.'
            );
        }
    }

    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm'>
                <Card>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription className=''>
                            <p>Email: admin1@gmail.com</p>
                            <p>Password: qqqq</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-8'
                            >
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Email is admin1@gmail.com'
                                                    type='email'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Password is qqqq'
                                                    type='password'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {errorMessage && (
                                    <p className='text-sm text-red-500'>
                                        {errorMessage}
                                    </p>
                                )}
                                <Button
                                    type='submit'
                                    className='w-full'
                                    disabled={
                                        isLoginLoading || isUserInfoLoading
                                    }
                                >
                                    {isLoginLoading || isUserInfoLoading
                                        ? 'Logging in...'
                                        : 'Submit'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PageLogin;
