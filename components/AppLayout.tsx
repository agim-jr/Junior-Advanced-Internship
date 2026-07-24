'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showNavigation = pathname !== '/' && pathname !== '/choose-plan';

  const isBookPage = pathname?.startsWith('/book/');

  return (
    <div className="flex min-h-screen">
      {showNavigation && <Sidebar />}

      <div className={`flex-1 ${showNavigation ? 'lg:ml-64' : ''}`}>
        {showNavigation && !isBookPage && (
          <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <SearchBar />
            </div>
          </div>
        )}

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
