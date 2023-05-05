'use client';

import { ReactElement, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type SearchUpdate = {
  target: {
    value: string;
  }
}

type HandleSearch = {
  preventDefault: () => void;
}

const SearchBar = () : ReactElement => {
  const [disabled, setDisabled] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const city = params.get('city');

  const getSearchFromUrl = () => {
    if (city) {
      setSearch(city);
    }
  };

  const updateSearch = (e: SearchUpdate) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      setDisabled(false);
    }
  };

  const handleSearch = (e: HandleSearch) => {
    e.preventDefault();
    router.push(`/search?city=${search}`);
    setSearch('');
  };

  useEffect(() => {
    getSearchFromUrl();
  }, []);

  return (
    <div className='flex justify-center py-3 m-auto text-lg text-left'>
      <input value={city || search} className='rounded mr-3 p-2 w-[450px]' type='text' placeholder='State, city or town' onChange={updateSearch} />
      <button disabled={disabled} type='button' className='px-9 py-2 text-white bg-red-600 rounded disabled:bg-gray-300 disabled:cursor-not-allowed' onClick={handleSearch}>
        Let&apos;s go
      </button>
    </div>
  );
};

export default SearchBar;
