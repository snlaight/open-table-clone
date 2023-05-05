'use client';

import { AlertProvider } from '@/context/AlertContext';
import AuthProvider from '@/context/AuthContext';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <AlertProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </AlertProvider>
);

const RenderProviders = ({ children }: { children: React.ReactNode }) => (
  <Providers>
    {children}
  </Providers>
);

export default RenderProviders;
