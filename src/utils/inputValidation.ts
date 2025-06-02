
import DOMPurify from 'dompurify';

export interface ValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errors: string[];
}

export class InputValidator {
  // Sanitize HTML content to prevent XSS
  static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'span'],
      ALLOWED_ATTR: ['class']
    });
  }

  // Validate and sanitize text input
  static validateText(input: string, maxLength: number = 1000): ValidationResult {
    const errors: string[] = [];
    let sanitizedValue = input.trim();

    // Length validation
    if (sanitizedValue.length === 0) {
      errors.push('Input cannot be empty');
    } else if (sanitizedValue.length > maxLength) {
      errors.push(`Input must be less than ${maxLength} characters`);
      sanitizedValue = sanitizedValue.substring(0, maxLength);
    }

    // Remove potentially dangerous content
    sanitizedValue = sanitizedValue
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');

    // Check for SQL injection patterns
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(--|\/\*|\*\/|;)/g
    ];

    sqlPatterns.forEach(pattern => {
      if (pattern.test(sanitizedValue)) {
        errors.push('Input contains potentially dangerous content');
      }
    });

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    };
  }

  // Validate email format
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

  // Validate URL format
  static validateUrl(url: string): ValidationResult {
    const errors: string[] = [];
    let sanitizedValue = url.trim();

    try {
      const urlObj = new URL(sanitizedValue);
      
      // Only allow HTTPS URLs for security
      if (urlObj.protocol !== 'https:') {
        errors.push('Only HTTPS URLs are allowed');
      }

      // Block potentially dangerous URLs
      const blockedDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
      if (blockedDomains.some(domain => urlObj.hostname.includes(domain))) {
        errors.push('URL points to blocked domain');
      }

    } catch (error) {
      errors.push('Invalid URL format');
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors
    };
  }

  // Rate limiting helper
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, number[]>();

    return (identifier: string): boolean => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!requests.has(identifier)) {
        requests.set(identifier, []);
      }

      const userRequests = requests.get(identifier)!;
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(time => time > windowStart);
      
      if (validRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }

      validRequests.push(now);
      requests.set(identifier, validRequests);
      
      return true; // Request allowed
    };
  }
}

// Create rate limiters for different operations
export const apiRateLimiter = InputValidator.createRateLimiter(100, 60000); // 100 requests per minute
export const authRateLimiter = InputValidator.createRateLimiter(5, 300000); // 5 auth attempts per 5 minutes
