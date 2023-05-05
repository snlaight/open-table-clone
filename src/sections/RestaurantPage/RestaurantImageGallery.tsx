import Image from 'next/image';
import React from 'react';

type Props = {
  images: string[];
}

const RestaurantImageGallery = ({ images }: Props) => (
  <div>
    <h1 className='pb-5 mt-10 mb-7 text-3xl font-bold border-b'>
      {images.length || 0}{images.length === 1 ? ' photo' : ' photos'}
    </h1>
    <div className='flex flex-wrap'>
      {images.map((image, index) => (
        <Image key={`${image}-${index}`} src={image} alt='' width={224} height={176} className='mr-1 mb-1 w-56 h-44' />
      ))}
    </div>
  </div>
);

export default RestaurantImageGallery;
