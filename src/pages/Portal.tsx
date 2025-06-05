
import React, { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import DimensionalPortal from '@/components/DimensionalPortal';

const Portal = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading Portal Interface..." />}>
            <DimensionalPortal />
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Portal;
