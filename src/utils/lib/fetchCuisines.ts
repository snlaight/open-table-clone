import prisma from '@/utils/prisma';

export const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return cuisines;
};

export default fetchCuisines;
