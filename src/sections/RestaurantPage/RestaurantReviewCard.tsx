import { Review } from '@prisma/client';
import { Stars } from '@/components';

type Props = {
  review: Review;
}

const RestaurantReviewCard = ({ review }: Props) => (
  <div>
    <div className='pb-7 mb-7 border-b'>
      <div className='flex'>
        <div className='flex flex-col items-center w-1/6'>
          <div className='flex justify-center items-center w-16 h-16 bg-blue-400 rounded-full'>
            <h2 className='text-2xl text-white'>{review.first_name[0]}{review.last_name[0]} </h2>
          </div>
          <p className='text-center'>{review.first_name} {review.last_name}</p>
        </div>
        <div className='ml-10 w-5/6'>
          <div className='flex items-center'>
            <div className='flex mr-5'>
              <Stars reviews={[review]} />
            </div>
          </div>
          <div className='mt-5'>
            <p className='font-light text-light'>
              {review.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RestaurantReviewCard;
