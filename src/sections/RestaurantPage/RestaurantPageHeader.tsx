import { Location } from '@prisma/client';
import React from 'react';

type Props = {
  name: string;
  location: Location | null;
}

const RestaurantPageHeader = ({ name, location }: Props) => (
  <div className='overflow-hidden h-96'>
    <div className='bg-center h-full bg-gradient-to-r from-[#0F1F47] to-[#5F6984] flex justify-center items-center'>
      <h1 className='text-7xl text-center text-white capitalize text-shadow'>
        {name} ({location?.name})
      </h1>
    </div>
  </div>
);

export default RestaurantPageHeader;
