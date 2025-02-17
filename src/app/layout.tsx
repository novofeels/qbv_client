// src/app/layout.tsx
'use client';
import './globals.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store'; // Ensure this path is correct




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='max-h-1'>
    

          <ReduxProvider store={store}>

     
 
                <div style={{ position: "relative", zIndex: 0 }}>{children}</div>
           

          </ReduxProvider>

      </body>
    </html>
  );
}

