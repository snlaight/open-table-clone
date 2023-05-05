import React from 'react';

import { RestaurantMenuType } from '@/utils/interfaces';

type Props = {
  item: RestaurantMenuType;
}

const MenuItemCard = ({ item }: Props) => (
  <div className='border rounded p-3 mb-3 w-[49%]'>
    <h3 className='text-lg font-bold'>
      {item.name}
    </h3>
    <p className='mt-1 text-sm font-light'>
      {item.description}
    </p>
    <p className='mt-7'>
      {item.price}
    </p>
  </div>
);

export default MenuItemCard;
