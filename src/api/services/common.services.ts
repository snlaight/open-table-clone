export const getBookingsAvailability = (bookings: any) => {
  const BookingTableObj : {[key:string] : {[key:number]:true}} = {};

  bookings.forEach((booking: any) => {
    const tableIdsObj: {[key:number]:true} = booking.bookings.reduce((obj: any, t: any) => ({ ...obj, [t.table_id]: true }), {});
    BookingTableObj[booking.booking_time.toISOString()] = tableIdsObj;
  });

  return BookingTableObj;
};

export const isReservationTimeValid = (reservationTime: string, openTime: string, closeTime: string): boolean => {
  const reservationDate = new Date(reservationTime);
  const openDate = new Date(`${reservationDate.toISOString().slice(0, 10)}T${openTime}`);
  const closeDate = new Date(`${reservationDate.toISOString().slice(0, 10)}T${closeTime}`);
  return reservationDate >= openDate && reservationDate <= closeDate;
};
