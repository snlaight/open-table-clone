/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { from } from 'rxjs';

import { post$1 } from '@/utils/lib/api';

type ReservationInputs = {
  [key: string]: string;
};

const InitialReservationInputs: ReservationInputs = {
  booker_first_name: '',
  booker_last_name: '',
  booker_phone: '',
  booker_email: '',
  booker_occasion: '',
  booker_request: '',
};

const useReservation = (name: string, date: string, time: string, partySize: string) => {
  const [fields, setFields] = useState<ReservationInputs>(InitialReservationInputs);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [didBook, setDidBook] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setDisabled(true);
    const data = from(post$1(`/api/restaurant/${name}/reserve?day=${date}&time=${time}&partySize=${partySize}`, fields)).subscribe(() => {
      setLoading(false);
      setFields(InitialReservationInputs);
      setDidBook(true);
      setTimeout(() => {
        router.push(`/restaurant/${name}`);
      }, 9000);
    });

    return () => {
      data.unsubscribe();
    };
  };

  useEffect(() => {
    const isDisabled = Object.values(fields).some((value) => value === '');
    setDisabled(isDisabled);
  }, [fields]);

  return { fields, handleChange, handleSubmit, disabled, didBook, error, loading };
};

export default useReservation;
