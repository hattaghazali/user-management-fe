import { useCreateAUserMutation } from '@/redux/features/users/user-api';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '@/lib/lib-validation';
import { cn } from '@/lib/utils';
import {
    EGender,
    EOccupation,
    genderMap,
    occupationMap,
    stateMap
} from '@/types/type-user';
import { Card, CardContent } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const PageCreateUser = () => {
    const [createAUser, { isLoading }] = useCreateAUserMutation();

    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            gender: undefined,
            occupation: undefined,
            state: undefined
        }
    });

    async function onSubmit(values: z.infer<typeof createUserSchema>) {
        try {
            const response = await createAUser(values).unwrap();
            toast.error(response.message);
            form.reset();
        } catch (error: any) {
            const errorMessage =
                error?.data?.message || 'Failed to create user';
            toast.error(errorMessage);
        }
    }

    return (
        <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
            <div className='w-full max-w-sm md:max-w-5xl'>
                <div className={cn('flex flex-col gap-6')}>
                    <Card className='overflow-hidden p-0'>
                        <CardContent className='grid p-0 md:grid-cols-2'>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-8 p-6 md:p-8'
                                >
                                    <div className='flex flex-col items-center text-center'>
                                        <h1 className='text-2xl font-bold'>
                                            User Form
                                        </h1>
                                        <p className='text-muted-foreground text-balance'>
                                            Fill in to create a user
                                        </p>
                                    </div>

                                    {/* START: Email */}
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter email'
                                                        type='email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* START: Password */}
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter password'
                                                        type='password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* START: Name */}
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter name'
                                                        type='text'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* START: Gender */}
                                    <FormField
                                        control={form.control}
                                        name='gender'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                    defaultValue={
                                                        field.value?.toString() ||
                                                        ''
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a gender' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem
                                                            value={EGender.Male.toString()}
                                                        >
                                                            {
                                                                genderMap[
                                                                    EGender.Male
                                                                ]
                                                            }
                                                        </SelectItem>
                                                        <SelectItem
                                                            value={EGender.Female.toString()}
                                                        >
                                                            {
                                                                genderMap[
                                                                    EGender
                                                                        .Female
                                                                ]
                                                            }
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* START: Occupation */}
                                    <FormField
                                        control={form.control}
                                        name='occupation'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Occupation
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                    defaultValue={
                                                        field.value?.toString() ||
                                                        ''
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select an occupation' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem
                                                            value={EOccupation.Student.toString()}
                                                        >
                                                            {
                                                                occupationMap[
                                                                    EOccupation
                                                                        .Student
                                                                ]
                                                            }
                                                        </SelectItem>
                                                        <SelectItem
                                                            value={EOccupation.Employee.toString()}
                                                        >
                                                            {
                                                                occupationMap[
                                                                    EOccupation
                                                                        .Employee
                                                                ]
                                                            }
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* START: State */}
                                    <FormField
                                        control={form.control}
                                        name='state'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                    defaultValue={
                                                        field.value?.toString() ||
                                                        ''
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Select a state' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.entries(
                                                            stateMap
                                                        ).map(
                                                            ([key, value]) => (
                                                                <SelectItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type='submit'
                                        className='w-full'
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? 'Creating...'
                                            : 'Create User'}
                                    </Button>
                                </form>
                            </Form>
                            <div className='bg-muted relative hidden md:block'>
                                <img
                                    src='https://images.pexels.com/photos/7821577/pexels-photo-7821577.jpeg'
                                    alt='Image'
                                    className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PageCreateUser;
