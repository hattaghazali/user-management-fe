import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { BookOpen, Database, Home, UserPlus } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { Sparkle } from 'lucide-react';
import { NavUser } from './nav-user';
// import { IconInnerShadowTop } from '@tabler/icons-react'; //Lag potential importing icons from tabler

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/admin/home',
        icon: Home
    }
];

const userlinks = [
    {
        title: 'Users List',
        url: '/admin/users',
        icon: Database
    },
    {
        title: 'Create User',
        url: '/admin/users/create',
        icon: UserPlus
    }
];

const otherlinks = [
    // {
    //     title: 'Testing',
    //     url: '/admin/testing',
    //     icon: BookOpen
    // },
    {
        title: 'Documentation',
        url: '/admin/documentation',
        icon: BookOpen
    }
    // {
    //     title: 'About',
    //     url: '/admin/about',
    //     icon: UserPlus
    // }
];

export function AppSidebar() {
    const location = useLocation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    return (
        <Sidebar variant='inset'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className='data-[slot=sidebar-menu-button]:!p-1.5'
                        >
                            <Link to='/admin/home'>
                                <Sparkle className='!size-5' />
                                <span className='text-base font-semibold'>
                                    User Management
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin Section</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Manage User</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {userlinks.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Other</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {otherlinks.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    name={userInfo?.name || 'Unknown User'}
                    email={userInfo?.email || 'No Email'}
                    avatar={
                        'https://avatars.githubusercontent.com/u/92319348?v=4'
                    }
                />
            </SidebarFooter>
        </Sidebar>
    );
}
