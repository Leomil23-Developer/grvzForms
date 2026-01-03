/**
 * Utility functions for file handling and validation
 */

import { CONFIG } from './config';
import type { FileValidationResult } from '@/types';

/**
 * Validate file type
 */
export function validateFileType(file: File): FileValidationResult {
  if (!(CONFIG.ACCEPTED_MIME_TYPES as readonly string[]).includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Only ${CONFIG.ACCEPTED_IMAGE_TYPES.join(', ')} are allowed.`,
    };
  }

  return { isValid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(file: File): FileValidationResult {
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    const maxSizeMB = CONFIG.MAX_FILE_SIZE / (1024 * 1024);
    return {
      isValid: false,
      error: `File size must not exceed ${maxSizeMB}MB.`,
    };
  }

  return { isValid: true };
}

/**
 * Validate file (combines type and size validation)
 */
export function validateFile(file: File): FileValidationResult {
  const typeValidation = validateFileType(file);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  const sizeValidation = validateFileSize(file);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }

  return { isValid: true };
}

/**
 * Convert file to Base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

/**
 * Generate unique filename
 */
export function generateUniqueFilename(originalName: string, prefix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = getFileExtension(originalName);
  const namePrefix = prefix ? `${prefix}-` : '';

  return `${namePrefix}${timestamp}-${random}.${extension}`;
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}
