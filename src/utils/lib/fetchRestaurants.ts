import prisma from '@/utils/prisma';

import { RestaurantCardType } from '@/utils/interfaces';

export const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_img: true,
      slug: true,
      Cuisine: true,
      Location: true,
      price: true,
      reviews: true,
    },
  });

  if (!restaurants) {
    throw new Error('No restaurants found');
  }

  return restaurants;
};
