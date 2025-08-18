import { useGetUsersQuery } from '@/redux/features/users/user-api';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IAPIError } from '@/types/type-api';
import { DateRange } from 'react-day-picker';
import { formatDateRange, formatDateToYYYYMMDD } from '@/lib/date-format';
import {
    genderMap,
    occupationMap,
    stateMap,
    statusMap
} from '@/types/type-user';
import { cn } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    Ellipsis,
    SlidersHorizontal
} from 'lucide-react';

import HeaderSection from '@/components/ui/header-section';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

// START: Page User
const PageUsersList = () => {
    const stateOptions = Object.entries(stateMap).map(([value, label]) => ({
        value,
        label
    }));
    const occupationOptions = Object.entries(occupationMap).map(
        ([value, label]) => ({
            value,
            label
        })
    );
    const statusOptions = Object.entries(statusMap).map(([value, label]) => ({
        value,
        label
    }));
    const genderOptions = Object.entries(genderMap).map(([value, label]) => ({
        value,
        label
    }));

    const [page, setPage] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const [states, setStates] = useState<string>(
        stateOptions.map((s) => s.value).join(',')
    );
    const [occupation, setOccupation] = useState<string>(
        occupationOptions.map((o) => o.value).join(',')
    );
    const [status, setStatus] = useState<string>(
        statusOptions.map((s) => s.value).join(',')
    );
    const [gender, setGender] = useState<string>(
        genderOptions.map((g) => g.value).join(',')
    );

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2025, 7, 1), // Set to 2024-12-31
        to: new Date()
    });

    // TODO: Format dates for API query
    const dateFrom = dateRange?.from
        ? formatDateToYYYYMMDD(dateRange.from)
        : undefined;
    const dateTo = dateRange?.to
        ? formatDateToYYYYMMDD(dateRange.to)
        : undefined;

    const { data, isLoading, error } = useGetUsersQuery({
        page,
        name,
        states,
        occupation,
        status,
        gender,
        dateFrom: dateFrom,
        dateTo: dateTo
    });

    const columns = [
        { label: 'Name', className: 'w-32' }, // Fixed width
        { label: 'Email', className: 'w-44' }, // Wider for emails
        { label: 'State', className: 'w-72' }, // Narrower for state
        { label: 'Gender', className: 'w-32' },
        { label: 'Occupation', className: 'w-32' },
        { label: 'Status', className: 'w-32' },
        { label: 'Created At', className: 'w-32' },
        { label: '', className: 'w-16 text-right' } // Actions column
    ];

    // Helper function to render table content
    const renderTableContent = () => {
        if (isLoading) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className='p-8 text-center'
                    >
                        Loading...
                    </TableCell>
                </TableRow>
            );
        }

        if (error && 'status' in error && error.status === 500) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className='p-8 text-center'
                    >
                        <div className='text-red-500'>
                            <p className='text-muted-foreground'>
                                {error && 'data' in error
                                    ? (error.data as IAPIError).message
                                    : 'Failed to load user details. The user may not exist or there was a network error.'}
                            </p>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        // if (isError) {
        //     return (
        //         <TableRow>
        //             <TableCell
        //                 colSpan={columns.length}
        //                 className='p-8 text-center'
        //             >
        //                 <div className='text-red-500'>
        //                     An error occurred while fetching users
        //                 </div>
        //             </TableCell>
        //         </TableRow>
        //     );
        // }

        // if (!data?.results || data.results.length === 0) {
        if (error) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className='p-8 text-center'
                    >
                        <div className='text-muted-foreground'>
                            {error && 'data' in error
                                ? (error.data as IAPIError).message
                                : 'Failed to load user details. The user may not exist or there was a network error.'}
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        return data?.results.map((user) => (
            <TableRow key={user._id}>
                <TableCell className={cn('p-4')}>
                    <div className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage
                                src={user.avatar?.img_url}
                                alt={user.name}
                            />
                        </Avatar>
                        <span>{user.name || 'No user name'}</span>
                    </div>
                </TableCell>
                <TableCell className={cn('p-4')}>
                    {user.email || 'No user email'}
                </TableCell>
                <TableCell className={cn('p-4')}>
                    {stateMap[user.state] || 'Unknown'}
                </TableCell>
                <TableCell className={cn('p-4')}>
                    {genderMap[user.gender] || 'Unknown'}
                </TableCell>
                <TableCell className={cn('p-4')}>
                    {occupationMap[user.occupation] || 'Unknown'}
                </TableCell>
                <TableCell className={cn('p-4')}>
                    {statusMap[user.status] || 'Unknown'}
                </TableCell>
                <TableCell className={cn('p-4')}>
                    {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'Unknown'}
                </TableCell>
                <TableCell className='p-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='outline'
                                className='data-[state=open]:bg-muted text-muted-foreground flex size-8 justify-self-end'
                                size='default'
                            >
                                <Ellipsis />
                                <span className='sr-only'>Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-32'>
                            <Link to={`/admin/users/${user._id}`}>
                                <DropdownMenuItem>
                                    View Details
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant='destructive'>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <HeaderSection title='User List' desc='This is a user list page' />

            <div className='flex flex-1 flex-col px-1'>
                <div className='@container/main flex flex-1 flex-col gap-2'>
                    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-2'>
                        {/* SECTION: Filters */}
                        <div className='flex max-w-full justify-between'>
                            {/* Search by name */}
                            <div className='col-span-full sm:col-span-2'>
                                <Input
                                    placeholder='Search by name...'
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setPage(1);
                                    }}
                                    className='w-[200px] px-4'
                                />
                            </div>
                            {/* Search by date */}
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant='outline' size='sm'>
                                            <SlidersHorizontal />
                                            {formatDateRange(dateRange)}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto'
                                        align='end'
                                    >
                                        <Calendar
                                            mode='range'
                                            numberOfMonths={1}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            disabled={(date: Date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                <div className=''>
                                    <Label className='text-muted-foreground mb-2 block text-sm font-medium'>
                                        States
                                    </Label>
                                    <MultiSelect
                                        maxCount={1}
                                        defaultValue={states.split(',')}
                                        options={stateOptions}
                                        value={states.split(',')}
                                        onValueChange={(value): string => {
                                            setStates(value.join(','));
                                            setPage(1);
                                            return value.join(',');
                                        }}
                                        placeholder='Select states...'
                                        singleLine
                                        autoSize={false}
                                    />
                                </div>
                                <div className=''>
                                    <Label className='text-muted-foreground mb-2 block text-sm font-medium'>
                                        Occupations
                                    </Label>
                                    <MultiSelect
                                        defaultValue={occupation.split(',')}
                                        options={occupationOptions}
                                        value={occupation.split(',')}
                                        onValueChange={(value): string => {
                                            setOccupation(value.join(','));
                                            setPage(1);
                                            return value.join(',');
                                        }}
                                        placeholder='Select occupations...'
                                        singleLine
                                    />
                                </div>
                                <div>
                                    <Label className='text-muted-foreground mb-2 block text-sm font-medium'>
                                        Status
                                    </Label>

                                    <MultiSelect
                                        defaultValue={status.split(',')}
                                        options={statusOptions}
                                        value={status.split(',')}
                                        onValueChange={(value): string => {
                                            setStatus(value.join(','));
                                            setPage(1);
                                            return value.join(',');
                                        }}
                                        placeholder='Select status...'
                                        singleLine
                                    />
                                </div>
                                <div>
                                    <Label className='text-muted-foreground mb-2 block text-sm font-medium'>
                                        Gender
                                    </Label>
                                    <MultiSelect
                                        defaultValue={gender.split(',')}
                                        options={genderOptions}
                                        value={gender.split(',')}
                                        onValueChange={(value): string => {
                                            setGender(value.join(','));
                                            setPage(1);
                                            return value.join(',');
                                        }}
                                        placeholder='Select gender...'
                                        singleLine
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SECTION: User List Table */}
                        <div className='overflow-x-auto rounded-lg border'>
                            <Table>
                                <TableHeader className={cn('bg-muted')}>
                                    <TableRow>
                                        {columns.map((col, idx) => (
                                            <TableHead
                                                key={col.label || idx}
                                                className={cn(
                                                    'p-4',
                                                    col.className
                                                )}
                                            >
                                                {col.label}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>{renderTableContent()}</TableBody>
                            </Table>
                        </div>

                        {/* SECTION: Pagination */}
                        {data?.pagination &&
                            data.results &&
                            data.results.length > 0 && (
                                <div className='flex items-center justify-between'>
                                    <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                                        Showing {data.pagination.currentPage} of{' '}
                                        {data.pagination.totalPages} pages (
                                        {data.pagination.totalItems} total
                                        users)
                                    </div>

                                    <div className='flex gap-2'>
                                        <Button
                                            variant='outline'
                                            className='hidden h-8 w-8 p-0 lg:flex'
                                            onClick={() =>
                                                setPage((prev) =>
                                                    Math.max(prev - 1, 1)
                                                )
                                            }
                                            disabled={page === 1}
                                        >
                                            <ChevronLeft />
                                        </Button>
                                        <Button
                                            variant='outline'
                                            className='hidden h-8 w-8 p-0 lg:flex'
                                            onClick={() =>
                                                setPage((prev) => prev + 1)
                                            }
                                            disabled={
                                                page ===
                                                data.pagination.totalPages
                                            }
                                        >
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default PageUsersList;
