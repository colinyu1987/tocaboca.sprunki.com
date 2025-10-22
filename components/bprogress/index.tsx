'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { ReactNode } from 'react';

interface BProgressProps {
  children?: ReactNode;
}

export function BProgress({ children }: BProgressProps) {
  return (
    <ProgressProvider
      height="4px"
      color="#a855f7"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
} 