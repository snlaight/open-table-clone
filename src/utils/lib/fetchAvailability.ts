import { AvailableTimes } from '@/utils/constants';

export const fetchAvailability = async (slug: string, day:string, time : string, partySize: number) => {
  const times = AvailableTimes.find((t) => t.time === time)?.searchTimes;

  if (!times) {
    return [];
  }

  return times;
};
