import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { editUserSchema, editImageSchema } from '@/lib/lib-validation';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    genderMap,
    occupationMap,
    stateMap,
    statusMap
} from '@/types/type-user';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useEditAUserInfoMutation,
    useGetAUserDetailsQuery,
    useEditUserImageMutation
} from '@/redux/features/users/user-api';
import { useEffect, useState, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';

const PageEditAUser = () => {
    // Create options arrays from your enums
    const GENDER_OPTIONS = Object.entries(genderMap).map(([value, label]) => ({
        value: value,
        label: label
    }));

    const OCCUPATION_OPTIONS = Object.entries(occupationMap).map(
        ([value, label]) => ({
            value: value,
            label: label
        })
    );

    const STATE_OPTIONS = Object.entries(stateMap).map(([value, label]) => ({
        value: value,
        label: label
    }));

    const STATUS_OPTIONS = Object.entries(statusMap).map(([value, label]) => ({
        value: value,
        label: label
    }));

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const { data: user, isLoading, error } = useGetAUserDetailsQuery(id!);
    const [editUserInfo, { isLoading: isUpdatingInfo }] =
        useEditAUserInfoMutation();
    const [editUserImage, { isLoading: isUploadingImage }] =
        useEditUserImageMutation();

    // Form for user info
    const form = useForm<z.infer<typeof editUserSchema>>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            email: '',
            name: '',
            gender: undefined,
            occupation: undefined,
            state: undefined,
            status: undefined
        }
    });

    // Form for image upload
    // const imageForm = useForm<z.infer<typeof editImageSchema>>({
    //     resolver: zodResolver(editImageSchema),
    //     defaultValues: {
    //         profileImage: undefined
    //     }
    // });

    useEffect(() => {
        // console.log('User data:', user);
        if (user) {
            // console.log('Setting form values:', {
            //     name: user.name || '',
            //     email: user.email || '',
            //     gender: user.gender,
            //     occupation: user.occupation,
            //     state: user.state,
            //     status: user.status,
            //     profileImage: user.avatar?.img_url
            // });

            // Set preview URL to current user avatar
            if (user.avatar?.img_url) {
                setPreviewUrl(user.avatar.img_url);
            }

            setTimeout(() => {
                form.reset({
                    name: user.name || '',
                    email: user.email || '',
                    gender: user.gender || undefined,
                    occupation: user.occupation || undefined,
                    state: user.state || undefined,
                    status: user.status || undefined
                });
            }, 100); // Adjust delay if needed (0-1000ms works in reported cases)

            // Check form values after reset (your existing timeout)
            // setTimeout(() => {
            //     console.log('Form values after reset:', form.getValues());
            // }, 100);
        }
    }, [user, form]);

    const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
        if (!id) return;

        try {
            const payload = {
                name: data.name,
                email: data.email,
                gender: data.gender,
                occupation: data.occupation,
                state: data.state,
                status: data.status
            };
            // console.log('the data', data);

            await editUserInfo({ id, payload }).unwrap();
            toast.success('User information updated successfully');
        } catch (error: any) {
            console.error('Update error:', error);
            toast.error(
                error?.data?.message || 'Failed to update user information'
            );
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file || !id) return;

        try {
            // Validate file using the schema
            const validationResult = editImageSchema.safeParse({
                profileImage: file
            });
            if (!validationResult.success) {
                const errorMessage =
                    validationResult.error.errors[0]?.message || 'Invalid file';
                toast.error(errorMessage);
                return;
            }

            // Create preview URL
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Upload the image
            await editUserImage({ id, imageFile: file }).unwrap();
            toast.success('Profile image updated successfully');

            // Clean up the object URL after successful upload
            URL.revokeObjectURL(objectUrl);
        } catch (error: any) {
            console.error('Image upload error:', error);
            toast.error(
                error?.data?.message || 'Failed to update profile image'
            );
            // Revert preview on error
            if (user?.avatar?.img_url) {
                setPreviewUrl(user.avatar.img_url);
            } else {
                setPreviewUrl('');
            }
        }
    };

    if (isLoading) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className='py-8 text-center'>
                <p className='text-red-500'>Failed to load user details</p>
                <Button onClick={() => navigate('/users')} className='mt-4'>
                    Back to Users
                </Button>
            </div>
        );
    }

    return (
        <>
            {/* START: Edit A User Image */}
            <div className='bg-card h-[200px] rounded-lg border'></div>

            {/* START: Edit A User Info */}
            <div className='mt-14 grid grid-cols-[1fr_3fr] gap-16'>
                <div>
                    <Card>
                        <div className='relative'>
                            <Avatar className='bg-accent h-32 w-32 border'>
                                <AvatarImage
                                    src={previewUrl || user.avatar?.img_url}
                                    alt={user.name}
                                />
                            </Avatar>

                            {/* Camera Icon Overlay */}
                            <button
                                type='button'
                                onClick={handleCameraClick}
                                disabled={isUploadingImage}
                                className='bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 rounded-full p-2 shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                                title='Change profile picture'
                            >
                                {isUploadingImage ? (
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                ) : (
                                    <Camera className='h-4 w-4' />
                                )}
                            </button>

                            {/* Hidden File Input */}
                            <input
                                type='file'
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept='image/*'
                                className='hidden'
                            />
                        </div>
                    </Card>
                </div>

                <div className=''>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            {/* START: Name */}
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* START: Email */}
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder='shadcn'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='occupation'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Occupation</FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                            value={
                                                field.value?.toString() || ''
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Select an occupation' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {OCCUPATION_OPTIONS.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='state'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                            value={
                                                field.value?.toString() || ''
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Select a state' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {STATE_OPTIONS.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='gender'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                            value={
                                                field.value?.toString() || ''
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Select a gender' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {GENDER_OPTIONS.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                            value={
                                                field.value?.toString() || ''
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Select a status' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {STATUS_OPTIONS.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' disabled={isUpdatingInfo}>
                                {isUpdatingInfo ? 'Editing...' : 'Edit User'}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default PageEditAUser;
