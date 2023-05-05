'use client';

import useReservation from '@/utils/hooks/useReservation';

type ConfirmationPageProps = {
  date: string;
  time: string;
  partySize: string;
  name: string;
};

const InputFields = [
  {
    name: 'booker_first_name',
    placeholder: 'First name',
  },
  {
    name: 'booker_last_name',
    placeholder: 'Last name',
  },
  {
    name: 'booker_phone',
    placeholder: 'Phone number',
  },
  {
    name: 'booker_email',
    placeholder: 'Email',
  },
  {
    name: 'booker_occasion',
    placeholder: 'Occasion (optional)',
  },
  {
    name: 'booker_request',
    placeholder: 'Requests (optional)',
  },
];

const ConfirmationPageForm = ({ date, time, partySize, name }: ConfirmationPageProps) => {
  const { fields, handleChange, handleSubmit, disabled, error, loading, didBook } = useReservation(name, date, time, partySize);

  const PageMarkdown = didBook ? (
    <div className='mt-10'>
      <h1 className='text-2xl font-bold'>Thank you for booking with us!</h1>
      <p className='mt-4 text-sm'>
        Your reservation is confirmed. We look forward to seeing you on {date} at {time} for {partySize} people.
      </p>
    </div>
  ) : (
    <>
      {InputFields.map((input) => (
        <input
          key={input.name}
          type='text'
          className='p-3 mb-4 w-80 rounded border'
          placeholder={input.placeholder}
          name={input.name}
          value={fields[input.name]}
          onChange={handleChange}
        />
      ))}
      <button disabled={disabled} type='button' className='p-3 w-full font-bold text-white bg-red-600 rounded cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed' onClick={handleSubmit}>
        Complete Reservation
      </button>
      <p className='mt-4 text-sm'>
        By clicking Complete Reservation, you agree to our OpenTable Terms of Service and Privacy Policy. Standard text message rates may apply. You may opt out of receiving text messages at any time.
      </p>
    </>
  );

  return (
    <div className='mt-10 flex flex-wrap justify-between w-[660px]'>
      {PageMarkdown}
    </div>
  );
};

export default ConfirmationPageForm;
