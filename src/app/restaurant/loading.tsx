import React from 'react';

const Loading = () => (
  <main>
    <div className='overflow-hidden h-96 animate-pulse bg-slate-200'>
      <div className='h-full bg-center' />
    </div>
    <div className='flex justify-between items-start m-auto -mt-9 w-2/3 0'>
      <div className='bg-white rounded p-3 shadow w-[70%]'>
        <nav className='flex pb-2 space-x-7 border-b text-reg'>
          <h4> Overview</h4>
          <p>Menu</p>
          <p>Reviews</p>
        </nav>
        <div className='mt-4 border-b pb-6 animate-pulse bg-slate-200 h-16 rounded w-[400px]' />
        <div className='flex items-end animate-pulse'>
          <div className='flex items-center mt-2 ratings'>
            <div className='flex items-center w-56 bg-slate-200' />
            <p className='ml-3 text-reg' />
          </div>
          <div>
            <p className='mt-1 ml-4 text-reg' />
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default Loading;
