import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RestaurantCardType } from '@/utils/interfaces';
import { RestaurantPrice, Stars } from '@/components';

interface Props {
  restaurant: RestaurantCardType;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => (
  <Link href={`/restaurant/${restaurant.slug}`}>
    <div className='overflow-hidden m-3 w-64 h-72 rounded border cursor-pointer'>
      <Image src={restaurant.main_img} alt='' width={250} height={144} className='object-cover w-full h-36' />
      <div className='p-1'>
        <h3 className='mb-2 text-2xl font-bold'>
          {restaurant.name}
        </h3>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className='ml-2'> {restaurant.reviews.length !== 1 ? `${restaurant.reviews.length} reviews` : `${restaurant.reviews.length} review` } </p>
        </div>
        <div className='flex space-x-3 font-light capitalize text-reg'>
          <p>{restaurant.Cuisine.name}  </p>
          <RestaurantPrice price={restaurant.price} />
          <p> {restaurant.Location.name} </p>
        </div>
        <p className='mt-1 text-sm font-bold'>Booked 3 times today</p>
      </div>
    </div>
  </Link>

);

export default RestaurantCard;
