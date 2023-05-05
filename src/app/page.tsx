
import { Header, RestaurantCardWrapper, RestaurantCard } from '@/components';
import { fetchRestaurants } from '@/utils/lib/fetchRestaurants';

const Home = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <main className='w-screen min-h-screen bg-gray-100'>
      <main className='m-auto max-w-screen-2xl bg-white'>
        {/*  */}
      </main>
      <Header />
      <RestaurantCardWrapper>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </RestaurantCardWrapper>
    </main>
  );
};

export default Home;
