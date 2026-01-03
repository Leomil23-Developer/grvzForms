import ImageKit from 'imagekit';

if (!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not defined');
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error('IMAGEKIT_PRIVATE_KEY is not defined');
}

if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not defined');
}

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export interface UploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  fileType: string;
}

/**
 * Upload an image to ImageKit with retry logic
 * @param file - File buffer or base64 string
 * @param fileName - Name for the uploaded file
 * @param folder - Optional folder path in ImageKit
 * @param retries - Number of retry attempts (default: 3)
 * @returns Upload response with file URL
 */
export async function uploadToImageKit(
  file: Buffer | string,
  fileName: string,
  folder: string = 'registrations',
  retries: number = 3,
): Promise<UploadResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await imagekit.upload({
        file,
        fileName,
        folder,
        useUniqueFileName: true,
        tags: ['registration'],
      });

      return {
        fileId: result.fileId,
        name: result.name,
        url: result.url,
        thumbnailUrl: result.thumbnailUrl || result.url,
        height: result.height,
        width: result.width,
        size: result.size,
        filePath: result.filePath,
        fileType: result.fileType,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error during upload');
      console.error(`ImageKit upload attempt ${attempt} failed:`, error);
      
      // Wait before retry (exponential backoff)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw new Error(`Failed to upload image to ImageKit after ${retries} attempts: ${lastError?.message}`);
}

/**
 * Validate image file before upload
 * @param file - File to validate
 * @returns true if valid, throws error otherwise
 */
export function validateImageFile(file: File): boolean {
  const MAX_SIZE = 25 * 1024 * 1024; // 25MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPG and PNG are allowed.');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('File size exceeds 25MB limit.');
  }

  return true;
}

/**
 * Convert File to base64 string for ImageKit upload
 * @param file - File object
 * @returns Base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
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
