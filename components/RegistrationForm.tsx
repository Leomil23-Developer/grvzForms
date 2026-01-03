'use client';

import { useState, ChangeEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registrationSchema, type RegistrationFormData } from '@/lib/validation';

// Reusable Icon Components (16px standard sizing)
const Icons = {
  User: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  Phone: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  ),
  Document: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  Upload: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  ),
  Check: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  AlertCircle: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  XCircle: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Info: () => (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  ),
  Lock: () => (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  X: () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
};

// Form Field Component
interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

function FormField({ label, id, error, hint, required, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
          <Icons.AlertCircle />
          <span>{error}</span>
        </p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
          <Icons.Info />
          <span>{hint}</span>
        </p>
      )}
    </div>
  );
}

// Section Header Component
interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  step: number;
}

function SectionHeader({ icon, title, step }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-900 text-white flex-shrink-0">
        {icon}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Step {step}</span>
        <span className="text-slate-300">·</span>
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
    </div>
  );
}

// File Upload Component
interface FileUploadProps {
  id: string;
  label: string;
  preview: string | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  disabled: boolean;
  error?: string;
}

function FileUpload({ id, label, preview, onFileChange, onRemove, disabled, error }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        <span className="text-red-500 ml-0.5">*</span>
      </label>
      
      {!preview ? (
        <label
          htmlFor={id}
          className={`
            relative flex flex-col items-center justify-center w-full h-32 
            border-2 border-dashed rounded-lg cursor-pointer transition-all duration-150
            ${error ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center py-4">
            <div className={`p-2 rounded-full mb-2 ${error ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-400'}`}>
              <Icons.Upload />
            </div>
            <p className="text-xs font-medium text-slate-600">Click to upload</p>
            <p className="text-xs text-slate-400 mt-0.5">PNG or JPG (max 25MB)</p>
          </div>
          <input
            type="file"
            id={id}
            accept="image/jpeg,image/jpg,image/png"
            onChange={onFileChange}
            disabled={disabled}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative group rounded-lg border border-slate-200 bg-white overflow-hidden">
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full h-32 object-contain bg-slate-50"
          />
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900 disabled:opacity-50"
            aria-label={`Remove ${label}`}
          >
            <Icons.X />
          </button>
          <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
            <span className="text-xs font-medium text-white flex items-center gap-1">
              <Icons.Check />
              Uploaded
            </span>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1" role="alert">
          <Icons.AlertCircle />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

// Alert Component
interface AlertProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  onDismiss?: () => void;
}

function Alert({ type, title, message, onDismiss }: AlertProps) {
  const styles = {
    success: {
      container: 'bg-emerald-50 border-emerald-200',
      icon: 'text-emerald-500',
      title: 'text-emerald-800',
      message: 'text-emerald-700',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      message: 'text-red-700',
    },
  };

  const s = styles[type];

  return (
    <div className={`rounded-lg border p-4 ${s.container}`} role="alert">
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${s.icon}`}>
          {type === 'success' ? <Icons.CheckCircle /> : <Icons.XCircle />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold ${s.title}`}>{title}</h3>
          <p className={`mt-0.5 text-sm ${s.message}`}>{message}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={`flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors ${s.icon}`}
            aria-label="Dismiss"
          >
            <Icons.X />
          </button>
        )}
      </div>
    </div>
  );
}

export default function RegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [idPicturePreview, setIdPicturePreview] = useState<string | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<RegistrationFormData | null>(null);
  const [needsDelivery, setNeedsDelivery] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const handleAccessMemberList = () => {
    if (accessCode === 'GRVZ2026') {
      setShowAccessModal(false);
      setAccessCode('');
      setAccessError('');
      router.push('/members');
    } else {
      setAccessError('Invalid access code. Please try again.');
    }
  };

  const handleFileChange = useCallback((
    e: ChangeEvent<HTMLInputElement>,
    field: 'idPicture' | 'qrCode',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 25 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Only JPG and PNG formats are allowed');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_SIZE) {
      alert('File size must not exceed 25MB');
      e.target.value = '';
      return;
    }

    setValue(field, file);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === 'idPicture') {
        setIdPicturePreview(reader.result as string);
      } else {
        setQrCodePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, [setValue]);

  const removeFile = useCallback((field: 'idPicture' | 'qrCode') => {
    setValue(field, undefined as unknown as File);
    if (field === 'idPicture') {
      setIdPicturePreview(null);
    } else {
      setQrCodePreview(null);
    }
  }, [setValue]);

  const onSubmit = async (data: RegistrationFormData) => {
    // Show payment reminder modal first
    setPendingFormData(data);
    setShowPaymentModal(true);
  };

  const handleActualSubmit = async () => {
    if (!pendingFormData) return;
    
    setShowPaymentModal(false);
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append('fullName', pendingFormData.fullName);
      formData.append('yamahaId', pendingFormData.yamahaId);
      formData.append('dateOfRegistration', pendingFormData.dateOfRegistration.toISOString());
      formData.append('emergencyContactName', pendingFormData.emergencyContactName);
      formData.append('emergencyContactNumber', pendingFormData.emergencyContactNumber);
      if (pendingFormData.deliveryAddress) {
        formData.append('deliveryAddress', pendingFormData.deliveryAddress);
      }
      formData.append('idPicture', pendingFormData.idPicture);
      formData.append('qrCode', pendingFormData.qrCode);

      const response = await fetch('/api/registrations', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setSubmitMessage({
        type: 'success',
        text: 'Your Yamaha ID has been successfully registered. You will be notified once your ID is ready.',
      });

      // Reset form
      reset();
      setIdPicturePreview(null);
      setQrCodePreview(null);
      setPendingFormData(null);
      setNeedsDelivery(false);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred during registration',
      });
      
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 flex items-center justify-center">
                <Image 
                  src="/GRVZLogo.png" 
                  alt="GRVZ Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-base font-semibold text-slate-900">GRVZ Registration Form</h1>
                <p className="text-xs text-slate-500">Yamaha ID Registration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Form
              </Link>
              <button
                onClick={() => setShowAccessModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Member List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Status Message */}
        {submitMessage && (
          <div className="mb-6">
            <Alert
              type={submitMessage.type}
              title={submitMessage.type === 'success' ? 'Registration Complete' : 'Registration Failed'}
              message={submitMessage.text}
              onDismiss={() => setSubmitMessage(null)}
            />
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Section 1: Personal Information */}
            <div className="p-5 sm:p-6 border-b border-slate-100">
              <SectionHeader icon={<Icons.User />} title="Personal Information" step={1} />
              
              <div className="space-y-4">
                <FormField
                  label="Full Name"
                  id="fullName"
                  required
                  error={errors.fullName?.message}
                >
                  <input
                    {...register('fullName')}
                    type="text"
                    id="fullName"
                    className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors"
                    placeholder="Enter your full legal name"
                    disabled={isSubmitting}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Yamaha ID"
                    id="yamahaId"
                    required
                    error={errors.yamahaId?.message}
                    hint="Uppercase letters, numbers, hyphens"
                  >
                    <input
                      {...register('yamahaId')}
                      type="text"
                      id="yamahaId"
                      className="w-full h-10 px-3 text-sm font-mono uppercase border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors"
                      placeholder="YAMAHA-12345"
                      disabled={isSubmitting}
                    />
                  </FormField>

                  <FormField
                    label="Registration Date"
                    id="dateOfRegistration"
                    required
                    error={errors.dateOfRegistration?.message}
                  >
                    <input
                      {...register('dateOfRegistration')}
                      type="date"
                      id="dateOfRegistration"
                      className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors"
                      disabled={isSubmitting}
                    />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Section 2: Emergency Contact */}
            <div className="p-5 sm:p-6 border-b border-slate-100">
              <SectionHeader icon={<Icons.Phone />} title="Emergency Contact" step={2} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Contact Name"
                  id="emergencyContactName"
                  required
                  error={errors.emergencyContactName?.message}
                >
                  <input
                    {...register('emergencyContactName')}
                    type="text"
                    id="emergencyContactName"
                    className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors"
                    placeholder="Full name"
                    disabled={isSubmitting}
                  />
                </FormField>

                <FormField
                  label="Contact Number"
                  id="emergencyContactNumber"
                  required
                  error={errors.emergencyContactNumber?.message}
                  hint="Philippines mobile number (e.g., 09171234567)"
                >
                  <input
                    {...register('emergencyContactNumber')}
                    type="tel"
                    id="emergencyContactNumber"
                    className="w-full h-10 px-3 text-sm font-mono border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors"
                    placeholder="09171234567"
                    disabled={isSubmitting}
                  />
                </FormField>
              </div>

              {/* Delivery Toggle */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <label htmlFor="deliveryToggle" className="text-sm font-medium text-slate-900 cursor-pointer">
                      Need ID delivery to your address?
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">Additional ₱50 for doorstep delivery</p>
                  </div>
                  <button
                    type="button"
                    id="deliveryToggle"
                    onClick={() => {
                      setNeedsDelivery(!needsDelivery);
                      if (!needsDelivery === false) {
                        setValue('deliveryAddress', '');
                        setValue('contactNumber', '');
                      }
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${
                      needsDelivery ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        needsDelivery ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {needsDelivery && (
                  <div className="mt-4 space-y-4">
                    <FormField
                      label="Your Contact Number"
                      id="contactNumber"
                      required={needsDelivery}
                      error={errors.contactNumber?.message}
                      hint="Philippines mobile number (e.g., 09171234567)"
                    >
                      <input
                        {...register('contactNumber')}
                        type="tel"
                        id="contactNumber"
                        className="w-full h-10 px-3 text-sm font-mono border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors"
                        placeholder="09171234567"
                        disabled={isSubmitting}
                      />
                    </FormField>

                    <FormField
                      label="Delivery Address"
                      id="deliveryAddress"
                      required
                      error={errors.deliveryAddress?.message}
                      hint="Complete address for ID delivery"
                    >
                      <textarea
                        {...register('deliveryAddress')}
                        id="deliveryAddress"
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 disabled:bg-slate-50 disabled:opacity-60 transition-colors resize-none"
                        placeholder="Enter your complete delivery address"
                        disabled={isSubmitting}
                      />
                    </FormField>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Documents */}
            <div className="p-5 sm:p-6 border-b border-slate-100">
              <SectionHeader icon={<Icons.Document />} title="Required Documents" step={3} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FileUpload
                  id="idPicture"
                  label="1×1 ID Picture"
                  preview={idPicturePreview}
                  onFileChange={(e) => handleFileChange(e, 'idPicture')}
                  onRemove={() => removeFile('idPicture')}
                  disabled={isSubmitting}
                  error={errors.idPicture?.message}
                />

                <FileUpload
                  id="qrCode"
                  label="Yamaha QR Code"
                  preview={qrCodePreview}
                  onFileChange={(e) => handleFileChange(e, 'qrCode')}
                  onRemove={() => removeFile('qrCode')}
                  disabled={isSubmitting}
                  error={errors.qrCode?.message}
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="p-5 sm:p-6 bg-slate-50">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Icons.Spinner />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Submit Registration</span>
                )}
              </button>
              
              <p className="mt-3 text-center text-xs text-slate-500">
                By submitting, you agree to the Terms of Service and Privacy Policy
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Icons.Info />
              All fields marked with * are required
            </span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <Icons.Lock />
              Your data is encrypted and secure
            </span>
          </div>
        </footer>
      </main>

      {/* Payment Reminder Modal */}
      {showPaymentModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowPaymentModal(false);
            setPendingFormData(null);
          }}
        >
          <div className="relative max-w-md w-full bg-white rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                Payment Reminder
              </h3>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setPendingFormData(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-900 mb-3">
                  Please send payment to GRVZ Treasurer:
                </p>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold min-w-[80px]">Name:</span>
                    <span>Allan Vidal</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold min-w-[80px]">GCash:</span>
                    <span className="font-mono">09544436580</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-amber-200">
                    <p className="font-semibold mb-2">Payment Details:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Club ID:</span>
                        <span className="font-semibold">₱150</span>
                      </div>
                      {pendingFormData?.deliveryAddress && (
                        <>
                          <div className="flex justify-between text-slate-700">
                            <span>Delivery:</span>
                            <span className="font-semibold">+₱50</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-amber-200 font-semibold text-slate-900">
                            <span>Total:</span>
                            <span>₱200</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {pendingFormData?.deliveryAddress && (
                <p className="text-xs text-slate-600">
                  Note: ₱50 delivery fee included for doorstep delivery to: <span className="font-medium text-slate-900">{pendingFormData.deliveryAddress}</span>
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPendingFormData(null);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleActualSubmit}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Proceed to Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access Code Modal */}
      {showAccessModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowAccessModal(false);
            setAccessCode('');
            setAccessError('');
          }}
        >
          <div className="relative max-w-md w-full bg-white rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Access Member List</h3>
              <button
                onClick={() => {
                  setShowAccessModal(false);
                  setAccessCode('');
                  setAccessError('');
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Please enter the access code to view the member list.
              </p>

              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Access Code
                </label>
                <input
                  type="password"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setAccessError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAccessMemberList();
                    }
                  }}
                  className="w-full h-10 px-3 text-sm font-mono border border-slate-200 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
                  placeholder="Enter access code"
                  autoFocus
                />
                {accessError && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                    <Icons.AlertCircle />
                    <span>{accessError}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAccessModal(false);
                    setAccessCode('');
                    setAccessError('');
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccessMemberList}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
