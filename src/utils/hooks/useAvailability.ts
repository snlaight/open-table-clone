import { useState } from 'react';

import { get$1 } from '@/utils/lib/api';

type TAvailabilityType = {
    slug: string;
    partySize: number;
    day: string;
    time: string;
};

const useAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{time:string; enoughSeats: boolean}[]|null>(null);

  const fetchAvailabilities = async ({ slug, partySize, day, time }: TAvailabilityType) => {
    setLoading(true);
    try {
      const response = await get$1(`/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`);

      setLoading(false);
      setData(response.data);
    } catch (err:any) {
      setLoading(false);
      setError(err.response.data);
    }
  };

  return {
    loading,
    error,
    data,
    fetchAvailabilities,
  };
};

export default useAvailability;
