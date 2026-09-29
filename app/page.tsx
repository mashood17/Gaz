'use client';

import dynamic from 'next/dynamic';

// Client-only dynamic import avoids SSR hydration mismatches with browser-only APIs
const App = dynamic(() => import('@/src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0B0704] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#F4B24D]/30 border-t-[#F4B24D] animate-spin" />
    </div>
  ),
});

export default function Page() {
  return <App />;
}
