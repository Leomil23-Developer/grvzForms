import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp, createErrorResponse } from '@/lib/api-utils';

const ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || 'GRVZ2026';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp, 10, 60000)) { // 10 requests per minute
      return createErrorResponse('Too many requests. Please try again later.', 429);
    }

    // Check access code in header
    const accessCode = request.headers.get('x-access-code');
    if (accessCode !== ACCESS_CODE) {
      return createErrorResponse('Unauthorized access', 401);
    }

    // Pagination support
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 100);
    const skip = (page - 1) * limit;

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.registration.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: registrations,
      count: registrations.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch registrations' 
      },
      { status: 500 }
    );
  }
}
