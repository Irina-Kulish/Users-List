import React from 'react';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">
      <Header />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};
