import prisma from '@/utils/prisma';

export const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return locations;
};

export default fetchLocations;
