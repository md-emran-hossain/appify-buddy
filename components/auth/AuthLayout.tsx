import React from 'react';
import AuthShapes from '@/components/auth/AuthShapes';
import DarkModeToggle from '@/components/layout/DarkModeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
  leftContent: React.ReactNode;
}

export default function AuthLayout({ children, leftContent }: AuthLayoutProps) {
  return (
    <>
      <main className="py-5 bg-body position-relative z-1 vh-100 overflow-auto d-flex flex-column justify-content-center">
      <DarkModeToggle />
      <AuthShapes />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            {leftContent}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {children}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
