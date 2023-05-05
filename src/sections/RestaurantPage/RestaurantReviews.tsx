import { Review } from '@prisma/client';
import React from 'react';
import RestaurantReviewCard from './RestaurantReviewCard';

type Props = {
  reviews: Review[]
}

const RestaurantReviews = ({ reviews }: Props) => (
  <div>
    <h1 className='pb-5 mt-10 mb-7 text-3xl font-bold border-b'>{reviews.length ? `What ${reviews.length} people are saying` : 'No reviews'}</h1>
    {reviews && reviews.map((review) => (
      <RestaurantReviewCard review={review} key={review.id} />
    ))}
  </div>
);

export default RestaurantReviews;
