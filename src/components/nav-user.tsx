import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAccessToken } from '@/redux/features/auth/auth-slice';

import { LogOut, EllipsisVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar';

interface INavUser {
    name: string;
    email: string;
    avatar: string;
}

export function NavUser({ name, email, avatar }: INavUser) {
    const { isMobile } = useSidebar();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearAccessToken());
        navigate('/', { replace: true });
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem className='border-t pt-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <Avatar className='h-8 w-8 rounded-full border'>
                                <AvatarImage src={avatar} alt={name} />
                                <AvatarFallback className='rounded-lg'>
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium'>
                                    {name}
                                </span>
                                <span className='text-muted-foreground truncate text-xs'>
                                    {email}
                                </span>
                            </div>
                            <EllipsisVertical className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <Avatar className='h-8 w-8 rounded-full border'>
                                    <AvatarImage src={avatar} alt={name} />
                                    <AvatarFallback className='rounded-lg'>
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>
                                        {name}
                                    </span>
                                    <span className='text-muted-foreground truncate text-xs'>
                                        {email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User />
                                <Link to='/admin/admin-profile'>Profile</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
