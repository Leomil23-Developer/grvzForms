import { z } from 'zod';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),

  yamahaId: z
    .string()
    .min(5, 'Yamaha ID must be at least 5 characters')
    .max(50, 'Yamaha ID must not exceed 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'Yamaha ID can only contain uppercase letters, numbers, and hyphens'),

  dateOfRegistration: z.coerce.date({
    required_error: 'Date of registration is required',
    invalid_type_error: 'Invalid date format',
  }),

  emergencyContactName: z
    .string()
    .min(2, 'Emergency contact name must be at least 2 characters')
    .max(100, 'Emergency contact name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  emergencyContactNumber: z
    .string()
    .regex(
      /^(\+?63|0)9\d{9}$/,
      'Please enter a valid Philippines mobile number (e.g., 09171234567 or +639171234567)',
    ),

  deliveryAddress: z
    .string()
    .max(200, 'Delivery address must not exceed 200 characters')
    .optional()
    .transform((val) => val?.trim() || undefined),

  idPicture: z
    .custom<File>()
    .refine((file: File) => file instanceof File, 'ID picture is required')
    .refine((file: File) => file && file.size <= MAX_FILE_SIZE, 'Image must be less than 25MB')
    .refine(
      (file: File) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG and PNG formats are accepted',
    ),

  qrCode: z
    .custom<File>()
    .refine((file: File) => file instanceof File, 'QR code is required')
    .refine((file: File) => file && file.size <= MAX_FILE_SIZE, 'Image must be less than 25MB')
    .refine(
      (file: File) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG and PNG formats are accepted',
    ),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Server-side validation schema (without File objects)
export const serverRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),
  yamahaId: z
    .string()
    .min(5, 'Yamaha ID must be at least 5 characters')
    .max(50, 'Yamaha ID must not exceed 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'Yamaha ID can only contain uppercase letters, numbers, and hyphens')
    .trim(),
  dateOfRegistration: z.string().or(z.date()),
  emergencyContactName: z
    .string()
    .min(2, 'Emergency contact name must be at least 2 characters')
    .max(100, 'Emergency contact name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),
  emergencyContactNumber: z
    .string()
    .regex(/^(\+?63|0)9\d{9}$/, 'Invalid Philippines mobile number')
    .trim(),
  deliveryAddress: z
    .string()
    .max(200, 'Delivery address must not exceed 200 characters')
    .trim()
    .optional()
    .transform((val) => val || undefined),
  idPictureUrl: z.string().url('Invalid ID picture URL'),
  qrCodeUrl: z.string().url('Invalid QR code URL'),
});

export type ServerRegistrationData = z.infer<typeof serverRegistrationSchema>;
