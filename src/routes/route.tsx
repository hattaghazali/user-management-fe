import { createBrowserRouter } from 'react-router-dom';
import LayoutAdminDashBoard from '@/components/layout/layout-admin-dashboard';
import PageLogin from '@/pages/page-login';
import PageHome from '@/pages/admin/page-home';
import PageAdminProfile from '@/pages/admin/page-admin-profile';
import PageUsersList from '@/pages/admin/page-users-list';
import PageCreateUser from '@/pages/admin/page-create-user';
import PageDashboardNotFound from '@/pages/admin/page-dashboard-not-found';
// import PageTesting from '@/pages/admin/page-testing';
import ProtectedRoute from '@/components/protected-route';
import PageUserDetails from '@/pages/admin/page-user-details';
import PageEditAUser from '@/pages/admin/page-edit-user';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLogin />
    },
    {
        path: '/admin',
        element: <ProtectedRoute />,
        children: [
            {
                element: <LayoutAdminDashBoard />,
                children: [
                    {
                        index: true,
                        path: 'home',
                        element: <PageHome />
                    },
                    {
                        path: 'admin-profile',
                        element: <PageAdminProfile />
                    },
                    {
                        path: 'users',
                        children: [
                            {
                                index: true, // /admin/users -> users list
                                element: <PageUsersList />
                            },
                            {
                                path: 'create', // /admin/users/create
                                element: <PageCreateUser />
                            },
                            {
                                path: ':id', // /admin/users/:id -> user details
                                element: <PageUserDetails />
                            },
                            {
                                path: ':id/edit', // /admin/users/:id/edit -> edit user
                                element: <PageEditAUser />
                            }
                        ]
                    },
                    // {
                    //     path: 'testing',
                    //     element: <PageTesting />
                    // },
                    {
                        path: '*',
                        element: <PageDashboardNotFound />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <PageDashboardNotFound />
    }
]);

export { router };
