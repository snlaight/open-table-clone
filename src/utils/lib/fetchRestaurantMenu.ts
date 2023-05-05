import prisma from '@/utils/prisma';
import { RestaurantMenuType } from '@/utils/interfaces';

const fetchRestaurantMenu = async (slug: string): Promise<RestaurantMenuType[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      Items: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          restaurant_id: true,
        },
      },
    },
  });

  if (!restaurant) throw new Error('Restaurant not found!');

  return restaurant.Items;
};

export default fetchRestaurantMenu;
