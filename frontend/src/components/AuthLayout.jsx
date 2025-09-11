import React from 'react';
import Header from './Header';

function AuthLayout({ children }) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-white text-black"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;