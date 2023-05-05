'use client';

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

import { AuthContext } from '@/context/AuthContext';
import { Auth, AlertWrapper } from '@/components';
import useAuth from '@/utils/hooks/useAuth';
import { useAlert } from '@/utils/hooks/useAlert';

const NavBar = () => {
  const { data, loading } = useContext(AuthContext);
  const { alerts } = useAlert();

  const { getMe, logout } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  const NavMarkup = data ? (
    <button
      type='button'
      className='p-1 px-4 mr-3 text-white bg-blue-400 rounded border'
      onClick={logout}
    >
      Logout
    </button>
  ) : (
    <Auth />
  );

  const markup = loading ? null : NavMarkup;

  return (
    <nav className='flex justify-between p-2 bg-white'>
      <AlertWrapper alerts={alerts || []} />
      <Link href='/' className='text-2xl font-bold text-gray-700'>
        OpenTable
      </Link>
      {markup}
    </nav>
  );
};

export default NavBar;
