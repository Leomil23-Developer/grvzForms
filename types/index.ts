/**
 * Common type definitions for the application
 */

import { Registration } from '@prisma/client';

// API Response Types
export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface SuccessResponse<T = unknown> {
  message: string;
  data: T;
}

export interface ErrorResponse {
  error: string;
  errors?: Record<string, string[]>;
}

// Registration Types
export type RegistrationData = Registration;

export interface CreateRegistrationData {
  fullName: string;
  yamahaId: string;
  dateOfRegistration: Date | string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  idPictureUrl: string;
  qrCodeUrl: string;
}

// File Upload Types
export interface UploadedFile {
  url: string;
  fileId: string;
  fileName: string;
  size: number;
  width?: number;
  height?: number;
}

export interface ImageKitAuthParams {
  token: string;
  expire: number;
  signature: string;
}

// Form Types
export interface FormFieldError {
  message: string;
  type: string;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

// Rate Limiting Types
export interface RateLimitInfo {
  count: number;
  resetTime: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}
