// layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
 
 
 
 
import React from 'react';
import ModalProvider from '@/components/provider/modal-provider';
 
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
 
 

const font = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MR InterView',
  description: 'MR InterView build by Mr',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
 return (
  <ClerkProvider> 
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className)}>   
            {children} 
            <ModalProvider/> 
      </body>
    </html>
    </ClerkProvider>
  );
}
