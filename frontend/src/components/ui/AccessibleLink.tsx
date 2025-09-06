import Link from 'next/link';
import { ReactNode } from 'react';

interface AccessibleLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  external?: boolean;
}

export function AccessibleLink({ 
  href, 
  children, 
  className = '', 
  ariaLabel, 
  ariaDescribedBy,
  external = false 
}: AccessibleLinkProps) {
  const baseClasses = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm transition-colors';
  
  if (external) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </Link>
  );
}