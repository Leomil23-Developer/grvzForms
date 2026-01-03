'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import JSZip from 'jszip';

interface Registration {
  id: string;
  fullName: string;
  yamahaId: string;
  dateOfRegistration: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  deliveryAddress: string | null;
  idPictureUrl: string;
  qrCodeUrl: string;
  createdAt: string;
  updatedAt: string;
}

const Icons = {
  Download: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  Users: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  AlertCircle: () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  Eye: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
};

export default function MembersPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/registrations/list', {
        headers: {
          'x-access-code': 'GRVZ2026',
        },
      });
      const result = await response.json();

      if (result.success) {
        setRegistrations(result.data);
      } else {
        setError(result.error || 'Failed to load registrations');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const downloadMember = async (registration: Registration) => {
    try {
      const zip = new JSZip();

      // Create member info text file
      const memberInfo = `GRVZ MEMBER INFORMATION
${'='.repeat(50)}

Full Name: ${registration.fullName}
Yamaha ID: ${registration.yamahaId}
Date of Registration: ${formatDate(registration.dateOfRegistration)}
Delivery Address: ${registration.deliveryAddress || 'N/A'}

EMERGENCY CONTACT
Name: ${registration.emergencyContactName}
Contact Number: ${registration.emergencyContactNumber}

REGISTRATION DETAILS
Registered On: ${formatDateTime(registration.createdAt)}
Last Updated: ${formatDateTime(registration.updatedAt)}

DOCUMENTS
ID Picture URL: ${registration.idPictureUrl}
QR Code URL: ${registration.qrCodeUrl}
`;
      
      zip.file('member-info.txt', memberInfo);

      // Fetch and add ID Picture
      try {
        const idPictureResponse = await fetch(registration.idPictureUrl);
        const idPictureBlob = await idPictureResponse.blob();
        const idPictureExt = registration.idPictureUrl.split('.').pop()?.split('?')[0] || 'jpg';
        zip.file(`id-picture.${idPictureExt}`, idPictureBlob);
      } catch (error) {
        console.error('Error fetching ID picture:', error);
      }

      // Fetch and add QR Code
      try {
        const qrCodeResponse = await fetch(registration.qrCodeUrl);
        const qrCodeBlob = await qrCodeResponse.blob();
        const qrCodeExt = registration.qrCodeUrl.split('.').pop()?.split('?')[0] || 'jpg';
        zip.file(`qr-code.${qrCodeExt}`, qrCodeBlob);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }

      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(content);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${registration.yamahaId}-${registration.fullName.replace(/\s+/g, '-')}.zip`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to download member data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center">
                <Image 
                  src="/GRVZLogo.png" 
                  alt="GRVZ Logo" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">GRVZ Members</h1>
                <p className="text-sm text-slate-500">Registered Yamaha ID Members</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Form
              </Link>
              <Link
                href="/members"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Member List
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Icons.Spinner />
            <p className="mt-4 text-sm text-slate-600">Loading registrations...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mb-4">
              <Icons.AlertCircle />
            </div>
            <p className="text-sm font-medium text-slate-900">{error}</p>
            <button
              onClick={fetchRegistrations}
              className="mt-4 text-sm text-slate-600 hover:text-slate-900 underline"
            >
              Try again
            </button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="p-3 rounded-full bg-slate-100 text-slate-400 mb-4">
              <Icons.Users />
            </div>
            <p className="text-sm font-medium text-slate-900">No registrations yet</p>
            <p className="mt-1 text-sm text-slate-500">Start by registering your first member</p>
          </div>
        ) : (
          <>
            {/* Stats Card */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100">
                  <Icons.Users />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Registrations</p>
                  <p className="text-2xl font-semibold text-slate-900">{registrations.length}</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Yamaha ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Registration Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Emergency Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Documents
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Registered On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {registrations.map((registration) => (
                      <tr key={registration.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{registration.fullName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-slate-600">{registration.yamahaId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{formatDate(registration.dateOfRegistration)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{registration.emergencyContactName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-slate-600">{registration.emergencyContactNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedImage({ url: registration.idPictureUrl, title: 'ID Picture' })}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
                            >
                              <Icons.Eye />
                              ID
                            </button>
                            <button
                              onClick={() => setSelectedImage({ url: registration.qrCodeUrl, title: 'QR Code' })}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
                            >
                              <Icons.Eye />
                              QR
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{formatDateTime(registration.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedRegistration(registration)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors"
                          >
                            <Icons.Eye />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedRegistration(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-lg p-6 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Registration Details</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadMember(selectedRegistration)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-colors"
                >
                  <Icons.Download />
                  Download
                </button>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-slate-900"></div>
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-lg p-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                    <p className="text-sm font-medium text-slate-900">{selectedRegistration.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Yamaha ID</label>
                    <p className="text-sm font-mono font-medium text-slate-900">{selectedRegistration.yamahaId}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Date of Registration</label>
                    <p className="text-sm text-slate-900">{formatDate(selectedRegistration.dateOfRegistration)}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Registered On</label>
                    <p className="text-sm text-slate-900">{formatDateTime(selectedRegistration.createdAt)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Delivery Address</label>
                    <p className="text-sm text-slate-900">{selectedRegistration.deliveryAddress || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-slate-900"></div>
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-lg p-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Contact Name</label>
                    <p className="text-sm text-slate-900">{selectedRegistration.emergencyContactName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Contact Number</label>
                    <p className="text-sm font-mono text-slate-900">{selectedRegistration.emergencyContactNumber}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-slate-900"></div>
                  Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">ID Picture</label>
                    <div className="relative h-48 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 group cursor-pointer"
                         onClick={() => setSelectedImage({ url: selectedRegistration.idPictureUrl, title: 'ID Picture' })}>
                      <Image
                        src={selectedRegistration.idPictureUrl}
                        alt="ID Picture"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium flex items-center gap-2">
                          <Icons.Eye />
                          View Full Size
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">QR Code</label>
                    <div className="relative h-48 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 group cursor-pointer"
                         onClick={() => setSelectedImage({ url: selectedRegistration.qrCodeUrl, title: 'QR Code' })}>
                      <Image
                        src={selectedRegistration.qrCodeUrl}
                        alt="QR Code"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium flex items-center gap-2">
                          <Icons.Eye />
                          View Full Size
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{selectedImage.title}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative w-full h-[600px] bg-slate-50 rounded-lg overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                quality={100}
                unoptimized
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
