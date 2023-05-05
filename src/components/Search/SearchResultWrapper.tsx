import React from 'react';

type Props = {
    children: React.ReactNode;
}

const SearchResultWrapper = ({ children }: Props) => (
  <div className='w-5/6'>
    {children}
  </div>
);

export default SearchResultWrapper;
