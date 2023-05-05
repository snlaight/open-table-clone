import Image from 'next/image';
import Link from 'next/link';

import { Stars } from '@/components';
import { SearchResultsType } from '@/utils/interfaces';
import RestaurantPrice from '../RestaurantCard/RestaurantPrice';
import { calculateReviewRatingAverage } from '@/utils/lib/convertRating';

type Props = {
  restaurant: SearchResultsType;
}

const SearchResultCard = ({ restaurant }: Props) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);
    if (rating > 4) return 'Awesome';
    if (rating <= 4 && rating > 3) return 'Good';
    if (rating <= 3 && rating > 2) return 'Average';
    if (rating <= 2 && rating > 1) return 'Bad';
    if (rating === 0) return 'No reviews yet';
    return '';
  };

  return (
    <div className='flex pb-5 border-b'>
      <Image className='w-56 h-44 rounded' width={224} height={176} src={restaurant.main_img} alt='' />
      <div className='pl-5'>
        <h2 className='text-3xl font-bold'>
          {restaurant.name}
        </h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className='ml-2 text-sm'>
            {renderRatingText()}
          </p>
        </div>
        <div className='mb-9'>
          <div className='flex space-x-4 font-light text-reg'>
            <RestaurantPrice price={restaurant.price} />
            <p className='capitalize'>{restaurant.Cuisine.name}</p>
            <p className='capitalize'>{restaurant.Location.name}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
