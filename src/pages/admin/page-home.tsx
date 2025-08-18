// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
    type ChartConfig,
    ChartLegend,
    ChartLegendContent,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';
import {
    ContactRound,
    GraduationCap,
    Mars,
    SlidersHorizontal,
    Users,
    Venus,
    Loader2
} from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useGetDemographicQuery } from '@/redux/features/demographic/demographic-api';
import { Separator } from '@/components/ui/separator';
import { formatDateRange, formatDateToYYYYMMDD } from '@/lib/date-format';

const chartConfig = {
    male_user: {
        label: 'Male',
        color: 'var(--chart-1)'
    },
    female_user: {
        label: 'Female',
        color: 'var(--chart-5)'
    }
} satisfies ChartConfig;

const PageHome = () => {
    // const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2025, 7, 1), // Set to 2024-12-31
        to: new Date(2025, 7, 12)
    });

    // Format dates for API query
    const dateFrom = dateRange?.from
        ? formatDateToYYYYMMDD(dateRange.from)
        : undefined;
    const dateTo = dateRange?.to
        ? formatDateToYYYYMMDD(dateRange.to)
        : undefined;

    const { data, isLoading } = useGetDemographicQuery({
        date_from: `${dateFrom}`,
        date_to: `${dateTo}`
    });

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        );
    }
    return (
        <>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                    <h3 className='text-lg font-medium'>
                        User Management System
                    </h3>
                    <p className='text-muted-foreground text-sm'>
                        Welcome to the admin dashboard of the system.
                    </p>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant='outline' size='sm'>
                            <SlidersHorizontal />
                            {formatDateRange(dateRange)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto' align='end'>
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
            <Separator className='my-2 flex-none' />

            <div className='mt-4 flex flex-1 flex-col'>
                <div className='@container/main flex flex-1 flex-col gap-2'>
                    <div className='flex flex-col gap-4 md:gap-6'>
                        {/* <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4'> */}
                        <div className='grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5'>
                            <Card className='@container/card'>
                                <CardHeader>
                                    <CardDescription>
                                        Total User
                                    </CardDescription>
                                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                        {data?.total_users}
                                    </CardTitle>
                                    <CardAction>
                                        <Badge variant='default'>
                                            <Users />
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                                    <div className='text-muted-foreground'>
                                        Total number of users being created
                                        based on the selected date range.
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className='@container/card'>
                                <CardHeader>
                                    <CardDescription>
                                        Total Male
                                    </CardDescription>
                                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                        {data?.total_male}
                                    </CardTitle>
                                    <CardAction>
                                        <Badge variant='default'>
                                            <Mars />
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                                    <div className='text-muted-foreground'>
                                        Total number of male users being created
                                        based on the selected date range.
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className='@container/card'>
                                <CardHeader>
                                    <CardDescription>
                                        Total Female
                                    </CardDescription>
                                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                        {data?.total_female}
                                    </CardTitle>
                                    <CardAction>
                                        <Badge variant='default'>
                                            <Venus />
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                                    <div className='text-muted-foreground'>
                                        Total number of female users being
                                        created based on the selected date
                                        range.
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className='@container/card'>
                                <CardHeader>
                                    <CardDescription>
                                        Total Student
                                    </CardDescription>
                                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                        {data?.total_occupation_student}
                                    </CardTitle>
                                    <CardAction>
                                        <Badge variant='default'>
                                            <GraduationCap />
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                                    <div className='text-muted-foreground'>
                                        Total number of students being created
                                        based on the selected date range.
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card className='@container/card'>
                                <CardHeader>
                                    <CardDescription>
                                        Total Employ
                                    </CardDescription>
                                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                        {data?.total_occupation_employ}
                                    </CardTitle>
                                    <CardAction>
                                        <Badge variant='default'>
                                            <ContactRound />
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                                    <div className='text-muted-foreground'>
                                        Total number of employ being created
                                        based on the selected date range.
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                        {/* START: Bar Chart Total Users */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Users</CardTitle>
                                <CardDescription>
                                    Showing total users created based on this
                                    selected date range{' '}
                                    {formatDateRange(dateRange)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={chartConfig}
                                    className='h-[320px] w-full'
                                >
                                    <BarChart
                                        accessibilityLayer
                                        data={data?.graph}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey='month'
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) =>
                                                value.slice(0, 3)
                                            }
                                        />
                                        <YAxis />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                        <ChartLegend
                                            content={<ChartLegendContent />}
                                        />
                                        <Bar
                                            dataKey='male_user'
                                            fill={chartConfig.male_user.color}
                                            radius={4}
                                        />
                                        <Bar
                                            dataKey='female_user'
                                            fill={chartConfig.female_user.color}
                                            radius={4}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        {/* END: Bar Chart Total Users */}
                    </div>
                </div>
            </div>
        </>
    );
};
export default PageHome;
