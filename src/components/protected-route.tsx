// components/protected-route.tsx
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { token, isAuthorized } = useSelector(
        (state: RootState) => state.auth
    );

    if (!token || !isAuthorized) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
