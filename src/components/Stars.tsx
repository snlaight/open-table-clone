/* eslint-disable no-plusplus */
import Image from 'next/image';
import { Review } from '@prisma/client';

import { EmptyStar, HalfStar, FullStar } from '@/assets/icons';
import { calculateReviewRatingAverage } from '@/utils/lib/convertRating';

type Props = {
  reviews: Review[];
}

const Stars = ({ reviews }: Props) => {
  const rating = calculateReviewRatingAverage(reviews);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(FullStar);
      else if (difference >= 0.5) stars.push(HalfStar);
      else stars.push(EmptyStar);
    }
    return stars.map((star, i) => (
      <Image key={i} className='space-x-1 w-4 h-4' src={star} alt='star' width={20} height={20} />
    ));
  };

  return (
    <div className='flex items-center'>
      {renderStars()}
    </div>
  );
};

export default Stars;
