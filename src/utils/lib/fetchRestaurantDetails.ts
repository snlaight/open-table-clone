import { notFound } from 'next/navigation';

import prisma from '@/utils/prisma';
import { RestaurantDetailsType } from '@/utils/interfaces';

const fetchRestaurantDetails = async (slug: string): Promise<RestaurantDetailsType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      Location: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default fetchRestaurantDetails;
