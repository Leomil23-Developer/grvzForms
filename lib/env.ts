/**
 * Environment variable validation
 * Ensures all required environment variables are present
 */

const requiredEnvVars = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  
  // ImageKit
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
} as const;

const optionalEnvVars = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ADMIN_ACCESS_CODE: process.env.ADMIN_ACCESS_CODE || 'GRVZ2026',
  API_SECRET_KEY: process.env.API_SECRET_KEY,
} as const;

export function validateEnv() {
  const missing: string[] = [];

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((key) => `  - ${key}`).join('\n')}\n\n` +
      'Please check your .env file or environment configuration.',
    );
  }
}

export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,
} as {
  DATABASE_URL: string;
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: string;
  IMAGEKIT_PRIVATE_KEY: string;
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: string;
  NODE_ENV: string;
  ADMIN_ACCESS_CODE: string;
  API_SECRET_KEY: string | undefined;
};

// Validate on import (only in Node.js environment, skip during build)
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  try {
    validateEnv();
  } catch (error) {
    if (error instanceof Error && process.env.NODE_ENV !== 'development') {
      process.exit(1);
    }
  }
}
