/* eslint-disable @typescript-eslint/ban-ts-comment */
// @eslint/ignore
// @ts-ignore
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getRestaurantData } from '@/utils/lib/prisma.reservation-services';
import { convertToDisplayTime } from '@/utils/lib/convertTime';
import { ConfirmationForm } from '@/sections';

const ConfirmationPageProps = {
  params: {
    name: 'string',
  },
  searchParams: {
    date: 'string',
    time: 'string',
    partySize: 'string',
  },
};

const ConfirmationPage = async ({ params, searchParams }: typeof ConfirmationPageProps) => {
  const restaurant = await getRestaurantData(params.name);

  if (!restaurant) return notFound();

  const [day, time] = searchParams.date.split('T');

  return (
    <section className='h-screen border-t'>
      <div className='py-9 m-auto w-3/5'>
        <div>
          <h3 className='font-bold'>
            You&apos;re almost done!
          </h3>
          <div className='flex mt-5'>
            <Image src={restaurant.main_img} alt='' className='w-32 h-32' width={128} height={128} />
            <div className='ml-4'>
              <h1 className='text-3xl font-bold capitalize'>
                {params.name.split('-').join(' ')}
              </h1>
              <div className='flex mt-3'>
                <p className='mr-6'>
                  {day}
                </p>
                <p className='mr-6'>
                  {convertToDisplayTime(time)}
                </p>
                <p className='mr-6'>
                  {searchParams.partySize} {searchParams.partySize === '1' ? 'person' : 'people'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ConfirmationForm date={day} time={time} partySize={searchParams.partySize} name={params.name} />
      </div>
    </section>
  );
};

export default ConfirmationPage;
