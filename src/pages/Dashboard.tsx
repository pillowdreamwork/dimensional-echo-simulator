
import React from 'react';
import { DreamForgeControlCenter } from '../components/dreamforge/DreamForgeControlCenter';
import { ErrorBoundary } from '../components/ErrorBoundary';

const Dashboard: React.FC = () => {
  return (
    <ErrorBoundary>
      <DreamForgeControlCenter />
    </ErrorBoundary>
  );
};

export default Dashboard;
