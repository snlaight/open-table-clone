'use client';

import Image from 'next/image';
import React from 'react';

import { ErrorIcon } from '@/assets/icons';

type Props = {
    error: Error;
}

const Error = ({ error }: Props) => (
  <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
    <Image src={ErrorIcon} alt='error' className='mb-8 w-56' />
    <div className='px-9 py-14 bg-white rounded shadow'>
      <h3 className='text-3xl font-bold'>
        Well, this is embarrassing.
      </h3>
      <p className='font-bold text-reg'>
        {error.message}
      </p>
      <p className='mt-6 text-sm font-light'>
        Error code: 400
      </p>
    </div>
  </div>
);

export default Error;
