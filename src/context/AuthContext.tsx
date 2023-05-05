/* eslint-disable @typescript-eslint/no-empty-function */

'use client';

import React, { createContext, useState, useMemo } from 'react';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

interface State {
    loading: boolean;
    error: string | null;
    data: User | null;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<{
        loading: boolean;
        error: string | null;
        data: User | null;
    }>>;

}

export const AuthContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

type Props ={
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const authContextValue = useMemo(() => ({
    ...authState,
    setAuthState,
  }), [authState, setAuthState]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
