import prisma from '@/utils/prisma';

import { SearchResultsType } from '@/utils/interfaces';

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: string;
}

const select = {
  id: true,
  name: true,
  main_img: true,
  slug: true,
  Cuisine: {
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  Location: {
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  price: true,
  reviews: true,
};

const fetchRestaurantsWithSearchParams = async (searchParams: SearchParams) : Promise<SearchResultsType[]> => {
  const where: any = {};
  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.Location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.Cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

export default fetchRestaurantsWithSearchParams;
