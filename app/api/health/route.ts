import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection
    const dbHealthy = await checkDatabaseConnection();

    if (!dbHealthy) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          database: 'disconnected',
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    // All checks passed
    return NextResponse.json(
      {
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
