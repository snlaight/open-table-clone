'use client';

import Image from 'next/image';
import React from 'react';

import { ErrorIcon } from '@/assets/icons';

const NotFound = () => (
  <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
    <Image src={ErrorIcon} alt='error' className='mb-8 w-56' />
    <div className='px-9 py-14 bg-white rounded shadow'>
      <h3 className='text-3xl font-bold'>
        Well, this is embarrassing.
      </h3>
      <p className='font-bold text-reg'>
        We couldn&apos;t find that restaurant
      </p>
      <p className='mt-6 text-sm font-light'>
        Error code: 404
      </p>
    </div>
  </div>
);

export default NotFound;
