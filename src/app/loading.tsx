import React from 'react';

import { Header } from '@/components';

const LoadingCard = () => (
  <div className='overflow-hidden m-3 w-64 h-72 rounded border animate-pulse cursor-pointer bg-slate-200' />
);

const Loading = () => (
  <main>
    <Header />
    <div className='flex flex-wrap justify-center px-36 py-3 mt-10'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
        <LoadingCard key={num} />
      ))}
    </div>
  </main>
);

export default Loading;
