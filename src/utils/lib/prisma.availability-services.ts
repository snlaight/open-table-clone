/* eslint-disable camelcase */
import prisma from '@/utils/prisma';

export const findAllBookings = async (day: string, time: string, availability: string[]) => {
  const start_time = availability.length > 0 && availability?.[0];
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${start_time}`),
        lte: new Date(`${day}T${availability[availability.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      bookings: true,
    },
  });

  return bookings;
};

export const getRestaurantData = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      tables: true,
      open_time: true,
      close_time: true,
    },
  });
  return restaurant;
};
