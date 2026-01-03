/**
 * Validate API request headers for security
 */
export function validateApiRequest(request: Request): boolean {
  const apiKey = request.headers.get('x-api-key');
  
  if (process.env.API_SECRET_KEY && apiKey !== process.env.API_SECRET_KEY) {
    return false;
  }
  
  return true;
}

/**
 * Create standardized API response
 */
export function createApiResponse<T>(
  data: T,
  status: number = 200,
): Response {
  return Response.json(data, { status });
}

/**
 * Create error API response
 */
export function createErrorResponse(
  message: string,
  status: number = 400,
  errors?: Record<string, string[]>,
): Response {
  return Response.json(
    {
      error: message,
      ...(errors && { errors }),
    },
    { status },
  );
}

/**
 * Rate limiting helper (simple in-memory implementation)
 * For production, use a proper rate limiting solution like Redis
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000, // 1 minute
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

/**
 * Get client IP address
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}
