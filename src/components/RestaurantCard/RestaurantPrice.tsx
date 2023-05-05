import React from 'react';
import { Price } from '@prisma/client';

type Props = {
    price: Price;
}

const PriceMarkdown = {
  CHEAP: {
    markdown: (
      <>
        <span> $$ </span> <span className='text-gray-400'> $$ </span>
      </>
    ),
  },
  REGULAR: {
    markdown: (
      <>
        <span> $$$ </span> <span className='text-gray-400'> $ </span>
      </>
    ),
  },
  EXPENSIVE: {
    markdown: (
      <span> $$$$ </span>
    ),
  },
};

const RestaurantPrice = ({ price }: Props) => {
  const renderPrice = () => {
    const priceMarkdown = PriceMarkdown[price];

    if (priceMarkdown) {
      return priceMarkdown.markdown;
    }

    return null;
  };
  return (
    <p className='flex'>
      {renderPrice()}
    </p>
  );
};

export default RestaurantPrice;
