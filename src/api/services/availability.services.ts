/* eslint-disable no-shadow */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getBookingsAvailability, isReservationTimeValid } from './common.services';
import { validateRequestQuery } from '@/utils/lib/validateRequest';
import { findAllBookings, getRestaurantData } from '@/utils/lib/prisma.availability-services';
import { FetchAvailabilityValidationRules } from '@/utils/validators';
import { fetchAvailability } from '@/utils/lib/fetchAvailability';

export const getAvailability = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query;

  const validationErrors = validateRequestQuery(req, FetchAvailabilityValidationRules);

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: [validationErrors] });
  }

  const partySizeNumber = Number(partySize);
  const availability = await fetchAvailability(slug as string, day as string, time as string, partySizeNumber);

  if (availability.length === 0) {
    return res.status(404).json({ message: 'No availability found' });
  }

  const bookings = await findAllBookings(day as string, time as string, availability);

  const availabilityWithBookings = getBookingsAvailability(bookings);

  const restaurant = await getRestaurantData(slug as string);

  if (!restaurant) {
    return res.status(404).json({ message: 'No tables found' });
  }

  const openTime = restaurant.open_time;
  const closeTime = restaurant.close_time;

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

  const availableTimes = filteredTimeAvailability.map((t) => {
    const sumSeats = t.tables.reduce((sum, table) => sum + table.seats, 0);
    const enoughSeats = sumSeats >= partySizeNumber;
    return {
      time: t.time,
      enoughSeats,
    };
  }).filter((availability) => {
    const isTimeValid = isReservationTimeValid(`${day}T${availability.time}`, openTime, closeTime);

    return isTimeValid && availability.enoughSeats;
  });

  return res.status(200).json({ data: availableTimes });
};
