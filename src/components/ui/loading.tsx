import type { FC } from 'react';

export const LoadingFallback: FC = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
      <p className="text-sm text-muted-foreground">Stabilizing Quantum Field...</p>
    </div>
  </div>
);