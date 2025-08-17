import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserInfoQuery } from '@/redux/features/auth/auth-api';
import {
    setUserInfo,
    clearAccessToken
} from '@/redux/features/auth/auth-slice';
import { useEffect } from 'react';

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const { token, isAuthorized } = useSelector(
        (state: RootState) => state.auth
    );
    const {
        data: fetchedUserInfo,
        isLoading,
        error
    } = useGetUserInfoQuery(undefined, {
        skip: !token // Will only fetch if token exists
    });

    // Update user info in Redux store when fetched
    useEffect(() => {
        if (fetchedUserInfo) {
            dispatch(setUserInfo(fetchedUserInfo));
        }
    }, [fetchedUserInfo, dispatch]);

    // Handle invalid token or failed user info fetch
    useEffect(() => {
        if (error) {
            // If getUserInfo fails (e.g., 401), clear token and redirect
            dispatch(clearAccessToken());
        }
    }, [error, dispatch]);

    // Redirect to login if no token, not authorized, or no user info
    if (!token || !isAuthorized) {
        return <Navigate to='/' replace />;
    }

    // Show loading state while fetching user info
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
