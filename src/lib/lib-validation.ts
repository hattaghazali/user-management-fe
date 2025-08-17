import { EGender, EOccupation, EState, EStatus } from '@/types/type-user';
import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .nonempty({ message: 'Email is required' }),
    password: z.string().nonempty({ message: 'Password is required' })
});

export const baseUserSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),

    name: z
        .string({ message: 'Name is required' })
        .min(1, { message: 'Name cannot be empty' })
        .min(4, { message: 'Name must be at least 4 characters long' }),

    password: z.string().min(3, { message: 'Password is required' }),

    gender: z
        .nativeEnum(EGender, {
            errorMap: () => ({ message: 'Please select a gender' })
        })
        .refine((val) => val !== undefined && val !== null, {
            message: 'Gender is required'
        }),

    occupation: z
        .nativeEnum(EOccupation, {
            errorMap: () => ({ message: 'Please select an occupation' })
        })
        .refine((val) => val !== undefined && val !== null, {
            message: 'Occupation is required'
        }),

    state: z
        .nativeEnum(EState, {
            errorMap: () => ({ message: 'Please select a state' })
        })
        .refine((val) => val !== undefined && val !== null, {
            message: 'State is required'
        }),

    status: z
        .nativeEnum(EStatus, {
            errorMap: () => ({ message: 'Please select a status' })
        })
        .refine((val) => val !== undefined && val !== null, {
            message: 'Status is required'
        }),

    profileImage: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= 5 * 1024 * 1024,
            'Image size should be less than 5MB'
        )
        .refine(
            (file) => !file || file.type.startsWith('image/'),
            'Please select a valid image file'
        )
});

// Create schema (includes password)
export const createUserSchema = baseUserSchema.omit({
    status: true,
    profileImage: true
});

// Edit schema (excludes password)
export const editUserSchema = baseUserSchema.omit({
    password: true,
    profileImage: true
});

// Edit image schema
export const editImageSchema = baseUserSchema.pick({ profileImage: true });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type EditUserFormValues = z.infer<typeof editUserSchema>;
export type EditUserImageFormValues = z.infer<typeof editImageSchema>;
