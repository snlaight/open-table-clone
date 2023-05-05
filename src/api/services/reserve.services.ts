/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getBookingsAvailability, isReservationTimeValid } from './common.services';
import { validateRequestQuery } from '@/utils/lib/validateRequest';
import { findAllBookings, getRestaurantData } from '@/utils/lib/prisma.availability-services';
import { makeBooking, createBookingOnTables } from '@/utils/lib/prisma.reservation-services';
import { ReserveValidationRules } from '@/utils/validators';
import { fetchAvailability } from '@/utils/lib/fetchAvailability';

export const handleReserve = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query;

  const { booker_email, booker_phone, booker_first_name, booker_last_name, booker_occasion, booker_request } = req.body;

  const validationErrors = validateRequestQuery(req, ReserveValidationRules);

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: [validationErrors] });
  }

  const restaurant = await getRestaurantData(slug as string);

  if (!restaurant) {
    return res.status(404).json({ errors: [{ restaurant: 'Restaurant not found' }] });
  }

  if (!isReservationTimeValid(`${day}T${time}`, restaurant.open_time, restaurant.close_time)) {
    return res.status(400).json({ errors: [{ time: 'Restaurant is not open at that time.' }] });
  }

  const availability = await fetchAvailability(slug as string, day as string, time as string, Number(partySize));

  if (availability.length === 0) {
    return res.status(404).json({ message: 'No availability found' });
  }

  const bookings = await findAllBookings(day as string, time as string, availability);

  const availabilityWithBookings = getBookingsAvailability(bookings);

  const timeAvailability = availability.map((time:string) => ({
    date: new Date(`${day}T${time}`),
    time,
    tables: restaurant.tables,
  }));

  const filteredTimeAvailability = timeAvailability.map((t) => {
    const availableTables = t.tables.filter((table) => {
      if (availabilityWithBookings[t.date.toISOString()]) {
        return !availabilityWithBookings[t.date.toISOString()][table.id];
      }
      return true;
    });
    return {
      ...t,
      tables: availableTables,
    };
  });

  const availableTables = filteredTimeAvailability.find((t) => t.time === time)?.tables;
  if (!availableTables || availableTables.length === 0) {
    return res.status(404).json({ message: 'No availability found' });
  }

  const enoughTables = availableTables.reduce((sum, table) => sum + table.seats, 0) >= Number(partySize);
  if (!enoughTables) {
    return res.status(400).json({ errors: [{ partySize: 'Not enough tables available for party size.' }] });
  }

  const TableCount: { 2: number[]; 4: number[] } = availableTables.reduce((acc, table) => {
    const key = table.seats;
    return {
      ...acc,
      [key]: [...acc[key], table.id],
    };
  }, { 2: [], 4: [] });

  const tablesToBook: number[] = [];

  let seatsRemaining = Number(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (TableCount[4].length) {
        tablesToBook.push(TableCount[4][0]);
        TableCount[4].shift();
        seatsRemaining -= 4;
      } else {
        tablesToBook.push(TableCount[2][0]);
        TableCount[2].shift();
        seatsRemaining -= 2;
      }
    } else if (TableCount[2].length) {
      tablesToBook.push(TableCount[2][0]);
      TableCount[2].shift();
      seatsRemaining -= 2;
    } else {
      tablesToBook.push(TableCount[4][0]);
      TableCount[4].shift();
      seatsRemaining -= 4;
    }
  }

  if (!tablesToBook.length) {
    return res.status(404).json({ message: 'No availability found' });
  }

  const booking = await makeBooking({
    restaurant_id: restaurant.id,
    number_of_people: Number(partySize),
    booking_time: new Date(`${day}T${time}`),
    booker_email,
    booker_phone,
    booker_first_name,
    booker_last_name,
    booker_occasion,
    booker_request,
  });

  await createBookingOnTables(booking.id, tablesToBook[0]);

  return res.status(200).json({ booking });
};
