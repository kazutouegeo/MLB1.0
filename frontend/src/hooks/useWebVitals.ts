'use client';

import { useEffect } from 'react';

export function useWebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Report Core Web Vitals
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
        onINP(console.log);
      }).catch(() => {
        // Fallback if web-vitals can't be loaded
        console.log('Web Vitals measurement not available');
      });
    }
  }, []);
}