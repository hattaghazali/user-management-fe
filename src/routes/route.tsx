import { createBrowserRouter } from 'react-router-dom';
import PageLogin from '@/pages/page-login';

const router = createBrowserRouter([
    {
        path: '/about',
        element: <p>page about</p>
    },
    {
        path: '/',
        element: <PageLogin />
    },
    {
        path: '/admin',
        children: [
            {
                index: true,
                element: <p>page main dashboard</p>
            },
            {
                path: 'create-user', // admin create a user here
                element: <p>create user page</p>
            }
        ]
    }
]);
export { router };
