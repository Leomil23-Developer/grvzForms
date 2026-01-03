import { imagekit } from '@/lib/imagekit';

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();

    return Response.json(authenticationParameters);
  } catch {
    return Response.json(
      { error: 'Failed to get authentication parameters' },
      { status: 500 },
    );
  }
}
