'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console and error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 mb-4">
            <Image 
              src="/GRVZLogo.png" 
              alt="GRVZ Logo" 
              width={48} 
              height={48}
              className="object-contain"
            />
          </div>
          
          <div className="p-3 rounded-full bg-red-100 text-red-600 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Something went wrong!
          </h1>
          
          <p className="text-sm text-slate-600 mb-6">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="w-full mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-xs font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-3 w-full">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-center"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
