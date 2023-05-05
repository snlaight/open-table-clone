/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Link from 'next/link';
import { Loading } from '@/components';
import { PartySize, AvailableTimes } from '@/utils/constants';
import { convertToDisplayTime } from '@/utils/lib/convertTime';
import useAvailability from '@/utils/hooks/useAvailability';

type TMakeAReservationProps = {
  openTime: string;
  closeTime: string;
  slug: string;
}

const MakeAReservation: React.FC<TMakeAReservationProps> = ({ openTime, closeTime, slug }) => {
  const [date, setDate] = useState<Date|null>(new Date());
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(openTime);
  const [partySize, setPartySize] = useState<number>(1);
  const { loading, data, error, fetchAvailabilities } = useAvailability();

  console.log(data);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0]);
      return setDate(date);
    }
    return setDate(null);
  };

  const filterAvailableTimes = () => {
    const openTimeHour = parseInt(openTime.split(':')[0], 10);
    const closeTimeHour = parseInt(closeTime.split(':')[0], 10);

    const availableTimes = AvailableTimes.filter((time) => {
      const timeHour = parseInt(time.time.split(':')[0], 10);

      return timeHour >= openTimeHour && timeHour <= closeTimeHour;
    });

    return availableTimes;
  };

  const handleFindATime = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  return (
    <div className='w-[27%] relative text-reg'>
      <div className='fixed min-w-[15%] bg-white rounded p-3 shadow'>
        <div className='pb-2 font-bold text-center border-b'>
          <h4 className='mr-7 text-lg'>
            Make a reservation
          </h4>
        </div>
        <div className='flex flex-col my-3'>
          <label htmlFor='party-size'>
            Party Size
          </label>
          <select id='party-size' name='' className='py-3 font-light text-center border-b shadow' required value={partySize} onChange={(e) => setPartySize(Number(e.target.value))}>
            {React.Children.toArray(PartySize.map((size) => (
              <option value={size.value}>{size.label}</option>
            )))}
          </select>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col w-[48%]'>
            <label htmlFor=''>Date</label>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              className='py-4 w-28 h-full font-light text-center border-b shadow focus:outline-none'
              wrapperClassName='w-[48%]'
              dateFormat='MMMM d'
            />
          </div>
          <div className='flex flex-col w-[48%]'>
            <label htmlFor=''>Time</label>
            <select name='' id='' className='py-3 w-28 h-full font-light text-center border-b shadow focus:outline-none' value={time} onChange={(e) => setTime(e.target.value)}>
              {React.Children.toArray(filterAvailableTimes().map((time) => (
                <option value={time.time}>{time.displayTime}</option>
              )))}
            </select>
          </div>
        </div>
        <div className='mt-5'>
          <button
            type='button'
            className='px-4 w-full h-16 font-bold text-white bg-red-600 rounded disabled:bg-red-600/60'
            disabled={loading}
            onClick={handleFindATime}
          >
            {loading ? <Loading size='12' /> : 'Find a time'}
          </button>
        </div>
        {data && data.length ? (
          <div className='mt-4'>
            <p className='text-reg'>
              Select a time
            </p>
            <div className='flex flex-col flex-wrap justify-start items-center mt-2 w-full lg:flex-row'>
              {React.Children.toArray(data.map(((time) => (time.enoughSeats ? (
                <Link href={`/confirmation/${slug}?date=${date?.toISOString().split('T')[0]}T${time.time}&partySize=${partySize}`} className='p-2 mr-3 mb-3 w-24 text-center text-white bg-red-600 rounded cursor-pointer'>
                  <p className='text-sm font-bold'>
                    {convertToDisplayTime(time.time)}
                  </p>
                </Link>

              ) : (
                <p className='p-2 mr-3 mb-3 w-24 bg-gray-300 rounded'>
                  No available times
                </p>
              )))))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MakeAReservation;
