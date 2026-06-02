import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '56px' }} />}>
      <SuccessClient />
    </Suspense>
  );
}