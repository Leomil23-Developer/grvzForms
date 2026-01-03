import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
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
          
          <div className="p-3 rounded-full bg-slate-100 text-slate-400 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Page Not Found
          </h1>
          
          <p className="text-sm text-slate-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors text-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
