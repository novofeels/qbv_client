// src/app/register/layout.tsx
'use client';

import React from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white">
        <h1>Register Your Account</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
