'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeProvider from './ThemeProvider';
import BrandProvider from './BrandProvider';
import DemoProvider from './DemoContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = pathname === '/login';

  if (isLogin) {
    return (
      <ThemeProvider>
        <BrandProvider>{children}</BrandProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <BrandProvider>
        <DemoProvider>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="main-content min-h-screen flex flex-col">
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 p-4 lg:p-6">
              {children}
            </main>
          </div>
        </DemoProvider>
      </BrandProvider>
    </ThemeProvider>
  );
}
