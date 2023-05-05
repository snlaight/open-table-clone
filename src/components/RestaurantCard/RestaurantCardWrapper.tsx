import React from 'react';

type Props = {
    children: React.ReactNode;
}

const RestaurantCardWrapper: React.FC<Props> = ({ children } : Props) => (
  <div className='flex flex-wrap px-36 py-3 mt-10'>{children}</div>
);

export default RestaurantCardWrapper;
