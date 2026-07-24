'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showNavigation = pathname !== '/' && pathname !== '/choose-plan';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {showNavigation && <Sidebar />}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
