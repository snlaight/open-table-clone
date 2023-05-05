'use client';

import '@/styles/globals.css';

import RenderProviders from '@/providers';
import { Navbar } from '@/components';

const RootLayout = (
  {
    children,
  }: {
      children: React.ReactNode
    },
) => (
  <html lang='en'>
    <head />
    <body>
      <RenderProviders>
        <main>
          <Navbar />
          {children}
        </main>
      </RenderProviders>
    </body>
  </html>
);

export default RootLayout;
