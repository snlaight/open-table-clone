import Link from 'next/link';
import { Price } from '@prisma/client';

type Props = {
    searchParams: {
        city?: string;
        cuisine?: string;
        price?: string;
    }
}

const prices = [
  {
    name: '$',
    value: Price.CHEAP,
    className: 'border w-full text-reg text-center font-light rounded-l p-2',
  },
  {
    name: '$$',
    value: Price.REGULAR,
    className: 'border-y w-full text-reg text-center font-light p-2',
  },
  {
    name: '$$$',
    value: Price.EXPENSIVE,
    className: 'border w-full text-reg text-center font-light rounded-r p-2',
  },
];

const SearchPriceButtons = ({ searchParams }: Props) => (
  <div className='flex'>
    {prices.map((price) => (
      <Link
        key={price.name}
        className={price.className}
        href={{
          pathname: '/search',
          query: {
            ...searchParams,
            price: price.value,
          },
        }}
      >
        {price.name}
      </Link>
    ))}

  </div>
);

export default SearchPriceButtons;
