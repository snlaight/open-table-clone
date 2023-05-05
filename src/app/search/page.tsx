import { Price } from '@prisma/client';

import fetchRestaurantsWithSearchParams from '@/utils/lib/fetchRestaurantsWithSearchParams';
import fetchLocations from '@/utils/lib/fetchLocations';
import fetchCuisines from '@/utils/lib/fetchCuisines';

import { SearchBar, SearchResultWrapper, SearchResultCard, SideBarOptions, SearchPriceButtons } from '@/components';

type Props = {
    searchParams : {
        city?: string;
        cuisine?: string;
        price?: Price;
    }
}

const SearchPage = async ({ searchParams } : Props) => {
  const restaurants = await fetchRestaurantsWithSearchParams(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  const RenderLocations = () => (!locations ? null : <SideBarOptions searchParams={searchParams} options={locations} title='Region' />);

  const RenderCuisines = () => (!cuisines ? null : <SideBarOptions searchParams={searchParams} options={cuisines} title='Cuisine' marginTop='mt-3' />);

  return (
    <section>
      <div className='bg-gradient-to-r from-[#0F1F47] to-[#5F6984] p-2'>
        <SearchBar />
      </div>
      <div className='flex justify-between items-start py-4 m-auto w-2/3'>
        <div className='pr-4 w-1/5'>
          <RenderLocations />
          <RenderCuisines />
          <div className='pb-4 mt-3'>
            <h1 className='mb-2'>Price</h1>
            <SearchPriceButtons searchParams={searchParams} />
          </div>
        </div>
        <SearchResultWrapper>
          { restaurants
            ? restaurants.map((restaurant) => (
              <SearchResultCard key={restaurant.id} restaurant={restaurant} />
            ))
            : <p>No restaurants found in this area.</p>}
        </SearchResultWrapper>
      </div>

    </section>
  );
};

export default SearchPage;
