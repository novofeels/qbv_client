// src/app/register/layout.tsx
'use client';

import Sidebar from '@/components/navbar/sidebar';
import Topbar from '@/components/navbar/topbar';
import React from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<>
<Topbar />
<Sidebar />
      <main className='mt-16'>{children}</main>
      </>

  );
}
