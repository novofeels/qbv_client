// src/app/approval/layout.tsx
'use client';

import React from 'react';

export default function ApprovalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 bg-green-600 text-white">
        <h1>Review Your Information</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
