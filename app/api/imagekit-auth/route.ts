import { NextRequest } from 'next/server';
import { imagekit } from '@/lib/imagekit';

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    
    return Response.json(authenticationParameters);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return Response.json(
      { error: 'Failed to get authentication parameters' },
      { status: 500 },
    );
  }
}
