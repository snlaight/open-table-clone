import Link from 'next/link';

type Region = {
    id: number;
    name: string;
};

type Cuisine = {
    id: number;
    name: string;
};

type SideBarOptionsProps = {
    options: Region[] | Cuisine[];
    title: string;
    marginTop?: string;
    searchParams: {
        city?: string;
        cuisine?: string;
        price?: string;
    }
};

const SideBarOptions = ({ options, title, marginTop, searchParams }: SideBarOptionsProps) => (
  <div className={`pb-4 border-b ${marginTop}`}>
    <h1 className='mb-2'>
      {title}
    </h1>
    {options.map((option) => (
      <Link
        key={option.id}
        href={{
          pathname: '/search',
          query: {
            ...searchParams,
            [title.toLowerCase() === 'region' ? 'city' : 'cuisine']: option.name,
          },
        }}
      >
        <p className='font-light capitalize text-reg'> {option.name} </p>
      </Link>
    ))}
  </div>

);

export default SideBarOptions;
