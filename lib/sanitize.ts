/**
 * Input sanitization utilities
 * Prevents XSS and injection attacks
 */

/**
 * Sanitize string input by removing dangerous characters
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

/**
 * Sanitize HTML to prevent XSS attacks
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize phone number
 * @param phone - Phone number to validate
 * @returns Sanitized phone number or null if invalid
 */
export function sanitizePhoneNumber(phone: string): string | null {
  const cleaned = phone.replace(/\D/g, '');

  // Philippines mobile number validation
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return cleaned;
  }

  if (cleaned.length === 12 && cleaned.startsWith('639')) {
    return `0${cleaned.substring(2)}`;
  }

  return null;
}

/**
 * Sanitize email address
 * @param email - Email to sanitize
 * @returns Sanitized email or null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Sanitize Yamaha ID
 * @param id - Yamaha ID to sanitize
 * @returns Sanitized Yamaha ID
 */
export function sanitizeYamahaId(id: string): string {
  return id
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, '');
}

/**
 * Sanitize name (allows letters, spaces, hyphens, apostrophes)
 * @param name - Name to sanitize
 * @returns Sanitized name
 */
export function sanitizeName(name: string): string {
  return name
    .trim()
    .replace(/[^a-zA-Z\s'-]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Sanitize address
 * @param address - Address to sanitize
 * @returns Sanitized address
 */
export function sanitizeAddress(address: string): string {
  return address
    .trim()
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ');
}
