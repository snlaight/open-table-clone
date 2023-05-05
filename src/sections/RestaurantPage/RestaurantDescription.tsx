/* eslint-disable camelcase */

'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import { Review } from '@prisma/client';
import { MakeAReservation, RestaurantImageGallery, RestaurantReviews, MenuItemsWrapper, MenuItemCard } from '@/sections';
import { RestaurantMenuType } from '@/utils/interfaces';
import { calculateReviewRatingAverage } from '@/utils/lib/convertRating';
import { Stars } from '@/components';

type Props = {
  description: string;
  images: string[];
  title: string;
  menu: RestaurantMenuType[];
  reviews: Review[];
  open_time: string;
  close_time: string;
  slug: string;
}

const RestaurantDescription = ({ description, images, title, menu, reviews, open_time, close_time, slug }: Props) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const overViewMarkup = (
    <>
      <div className='flex items-end'>
        <div className='flex items-center mt-2'>
          <Stars reviews={reviews} />
          <p className='ml-3 text-reg'> {calculateReviewRatingAverage(reviews).toFixed(1)} </p>
        </div>
        <div>
          <p className='ml-4 text-reg'>
            {reviews.length ? reviews.length : 'No'} reviews
          </p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-lg font-light'>
          {description}
        </p>
      </div>
      <RestaurantImageGallery images={images} />
      <RestaurantReviews reviews={reviews} />
    </>
  );

  const menuMarkup = (
    <MenuItemsWrapper>
      {menu.map((item) => (
        <MenuItemCard item={item} key={item.id} />
      ))}
      {!menu.length && (
        <div className='flex flex-wrap justify-between'>
          <p className='text-2xl font-light'>This restaurant did not provide a menu.</p>
        </div>
      )}
    </MenuItemsWrapper>
  );

  return (
    <div className='flex justify-between items-start -m-11 mx-auto w-2/3 0'>
      <div className='bg-white w-[100%] rounded p-3 mr-2 shadow'>
        <nav className='flex pb-2 space-x-7 border-b text-reg'>
          <p onClick={() => handleTabChange('overview')} className='cursor-pointer'>Overview</p>
          <p onClick={() => handleTabChange('menu')} className='cursor-pointer'>Menu</p>
        </nav>
        <div className='pb-6 mt-4 border-b'>
          <h1 className='text-6xl font-bold'>{title}</h1>
        </div>
        {selectedTab === 'overview' ? overViewMarkup : menuMarkup}
      </div>
      <MakeAReservation openTime={open_time} closeTime={close_time} slug={slug} />
    </div>
  );
};

export default RestaurantDescription;
