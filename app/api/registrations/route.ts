import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadToImageKit } from '@/lib/imagekit';
import { serverRegistrationSchema } from '@/lib/validation';
import {
  createApiResponse,
  createErrorResponse,
  checkRateLimit,
  getClientIp,
} from '@/lib/api-utils';
import {
  sanitizeName,
  sanitizeYamahaId,
  sanitizePhoneNumber,
  sanitizeAddress,
} from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp, 5, 300000)) { // 5 requests per 5 minutes
      return createErrorResponse('Too many requests. Please try again later.', 429);
    }

    // Parse form data
    const formData = await request.formData();
    
    const fullName = sanitizeName((formData.get('fullName') as string) || '');
    const yamahaId = sanitizeYamahaId((formData.get('yamahaId') as string) || '');
    const dateOfRegistration = formData.get('dateOfRegistration') as string;
    const emergencyContactName = sanitizeName((formData.get('emergencyContactName') as string) || '');
    const emergencyContactNumber = sanitizePhoneNumber(
      (formData.get('emergencyContactNumber') as string) || '',
    );
    const deliveryAddress = formData.get('deliveryAddress')
      ? sanitizeAddress(formData.get('deliveryAddress') as string)
      : null;
    const idPicture = formData.get('idPicture') as File;
    const qrCode = formData.get('qrCode') as File;

    // Basic validation
    if (!fullName || !yamahaId || !dateOfRegistration || !emergencyContactName || !emergencyContactNumber) {
      return createErrorResponse('All required fields must be filled', 400);
    }

    // Validate files
    if (!idPicture || !qrCode) {
      return createErrorResponse('ID Picture and QR Code are required', 400);
    }

    // Validate file types and sizes
    const MAX_SIZE = 25 * 1024 * 1024; // 25MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!ALLOWED_TYPES.includes(idPicture.type) || !ALLOWED_TYPES.includes(qrCode.type)) {
      return createErrorResponse('Only JPG and PNG formats are allowed', 400);
    }

    if (idPicture.size > MAX_SIZE || qrCode.size > MAX_SIZE) {
      return createErrorResponse('File size must not exceed 25MB', 400);
    }

    // Check for duplicate Yamaha ID
    const existingRegistration = await prisma.registration.findUnique({
      where: { yamahaId },
    });

    if (existingRegistration) {
      return createErrorResponse('This Yamaha ID is already registered', 409);
    }

    // Upload images to ImageKit
    const idPictureBuffer = Buffer.from(await idPicture.arrayBuffer());
    const qrCodeBuffer = Buffer.from(await qrCode.arrayBuffer());

    const [idPictureUpload, qrCodeUpload] = await Promise.all([
      uploadToImageKit(
        idPictureBuffer,
        `id-${yamahaId}-${Date.now()}.${idPicture.type.split('/')[1]}`,
        'registrations/id-pictures',
      ),
      uploadToImageKit(
        qrCodeBuffer,
        `qr-${yamahaId}-${Date.now()}.${qrCode.type.split('/')[1]}`,
        'registrations/qr-codes',
      ),
    ]);

    // Validate data with server schema
    const validatedData = serverRegistrationSchema.parse({
      fullName,
      yamahaId,
      dateOfRegistration,
      emergencyContactName,
      emergencyContactNumber,
      deliveryAddress: deliveryAddress?.trim() || undefined,
      idPictureUrl: idPictureUpload.url,
      qrCodeUrl: qrCodeUpload.url,
    });

    // Save to database
    const registration = await prisma.registration.create({
      data: {
        fullName: validatedData.fullName,
        yamahaId: validatedData.yamahaId,
        dateOfRegistration: new Date(validatedData.dateOfRegistration),
        emergencyContactName: validatedData.emergencyContactName,
        emergencyContactNumber: validatedData.emergencyContactNumber,
        deliveryAddress: validatedData.deliveryAddress || null,
        idPictureUrl: validatedData.idPictureUrl,
        qrCodeUrl: validatedData.qrCodeUrl,
      },
    });

    return createApiResponse(
      {
        message: 'Registration successful',
        data: {
          id: registration.id,
          yamahaId: registration.yamahaId,
        },
      },
      201,
    );
  } catch (error) {
    // Registration error

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'errors' in error) {
      const zodError = error as { errors: Array<{ path: string[]; message: string }> };
      const formattedErrors = zodError.errors.reduce((acc, err) => {
        const field = err.path.join('.');
        if (!acc[field]) acc[field] = [];
        acc[field].push(err.message);
        return acc;
      }, {} as Record<string, string[]>);
      
      return createErrorResponse(
        'Validation failed. Please check your input.',
        400,
        formattedErrors,
      );
    }

    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('ImageKit')) {
        return createErrorResponse('Failed to upload images. Please try again.', 500);
      }
      
      if (error.message.includes('Unique constraint')) {
        return createErrorResponse('This Yamaha ID is already registered', 409);
      }

      // Return specific error message in development, generic in production
      if (process.env.NODE_ENV === 'development') {
        return createErrorResponse(error.message, 500);
      }
    }

    return createErrorResponse('An error occurred during registration. Please try again later.', 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yamahaId = searchParams.get('yamahaId');

    if (!yamahaId) {
      return createErrorResponse('Yamaha ID is required', 400);
    }

    const registration = await prisma.registration.findUnique({
      where: { yamahaId },
    });

    if (!registration) {
      return createErrorResponse('Registration not found', 404);
    }

    return createApiResponse({ data: registration });
  } catch (error) {
    console.error('Get registration error:', error);
    return createErrorResponse('An error occurred', 500);
  }
}
