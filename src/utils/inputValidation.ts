export interface ValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errors: string[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

export class InputValidator {
  // Sanitize HTML content to prevent XSS
  static sanitizeHtml(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove < and > characters
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/data:/gi, '') // Remove data: URIs
      .trim();
  }

  // Validate and sanitize text input, return actual data
  static validateText(input: string, maxLength: number = 1000): ValidationResult {
    const errors: string[] = [];
    let sanitizedValue = input.trim();

    if (sanitizedValue.length === 0) {
      errors.push('Input cannot be empty');
    } else if (sanitizedValue.length > maxLength) {
      errors.push(`Input must be less than ${maxLength} characters`);
      sanitizedValue = sanitizedValue.substring(0, maxLength);
    }

    sanitizedValue = this.sanitizeHtml(sanitizedValue);

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    };
  }

  // Validate email format, return actual data
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    const sanitizedValue = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedValue)) {
      errors.push('Invalid email format');
    }

    if (sanitizedValue.length > 254) {
      errors.push('Email address too long');
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    };
  }

  // Validate URL format, return actual data
  static validateUrl(url: string): ValidationResult & { urlObject?: URL } {
    const errors: string[] = [];
    let sanitizedValue = url.trim();
    let urlObject: URL | undefined;

    try {
      urlObject = new URL(sanitizedValue);
      
      if (!['https:', 'http:'].includes(urlObject.protocol)) {
        errors.push('Only HTTP/HTTPS URLs are allowed');
      }

      const blockedDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
      if (blockedDomains.some(domain => urlObject!.hostname.includes(domain))) {
        errors.push('URL points to blocked domain');
      }
    } catch (error) {
      errors.push('Invalid URL format');
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors,
      urlObject: errors.length === 0 ? urlObject : undefined
    };
  }

  // Rate limiting helper, return actual data
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, number[]>();

    return (identifier: string): RateLimitResult => {
      const now = Date.now();
      const windowStart = now - windowMs;

      if (!requests.has(identifier)) {
        requests.set(identifier, []);
      }

      const userRequests = requests.get(identifier)!;
      const validRequests = userRequests.filter(time => time > windowStart);
      requests.set(identifier, validRequests);

      const allowed = validRequests.length < maxRequests;
      if (allowed) {
        validRequests.push(now);
      }

      return {
        allowed,
        remaining: Math.max(0, maxRequests - validRequests.length),
        reset: validRequests.length > 0 ? windowStart + windowMs : now + windowMs
      };
    };
  }
}

// Pre-configured rate limiters
export const apiRateLimiter = InputValidator.createRateLimiter(100, 60000); // 100 requests per minute
export const authRateLimiter = InputValidator.createRateLimiter(5, 300000); // 5 auth attempts per 5 minutes
