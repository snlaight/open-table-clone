/* eslint-disable camelcase */
import prisma from '@/utils/prisma';

interface IBooking {
  number_of_people: number;
  booking_time: Date | string;
  booker_email: string;
  booker_phone: string;
  booker_first_name: string;
  booker_last_name: string;
  booker_occasion: string;
  booker_request: string;
  restaurant_id: number;
}

export const getRestaurantData = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  return restaurant;
};

export const makeBooking = async ({
  number_of_people,
  booking_time,
  booker_email,
  booker_phone,
  booker_first_name,
  booker_last_name,
  booker_occasion,
  booker_request,
  restaurant_id,
}: IBooking) => {
  const booking = await prisma.booking.create({
    data: {
      number_of_people,
      booking_time,
      booker_email,
      booker_phone,
      booker_first_name,
      booker_last_name,
      booker_occasion,
      booker_request,
      restaurant_id,
    },
  });

  return booking;
};

export const createBookingOnTables = async (bookingId: number, tableId: number) => {
  const bookingOnTables = await prisma.bookingTable.createMany({
    data: {
      booking_id: bookingId,
      table_id: tableId,
    },
  });

  return bookingOnTables;
};
