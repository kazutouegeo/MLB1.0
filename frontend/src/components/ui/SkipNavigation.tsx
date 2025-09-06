'use client';

import { useEffect, useState } from 'react';

export function SkipNavigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleBlur);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleBlur);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 z-50 transform transition-transform duration-200 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <a
        href="#main-content"
        className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-br-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        Skip to main content
      </a>
    </div>
  );
}