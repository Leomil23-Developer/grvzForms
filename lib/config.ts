export const CONFIG = {
  // Application
  APP_NAME: 'grvzProjectForm',
  APP_DESCRIPTION: 'Yamaha Registration System',
  
  // File Upload Constraints
  MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB in bytes
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ACCEPTED_MIME_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  
  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: 5,
  RATE_LIMIT_WINDOW_MS: 5 * 60 * 1000, // 5 minutes
  
  // Form Validation
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_YAMAHA_ID_LENGTH: 5,
  MAX_YAMAHA_ID_LENGTH: 50,
  
  // ImageKit Folders
  IMAGEKIT_ID_PICTURES_FOLDER: 'registrations/id-pictures',
  IMAGEKIT_QR_CODES_FOLDER: 'registrations/qr-codes',
} as const;

export type Config = typeof CONFIG;
