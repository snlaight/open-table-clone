import { RestaurantDescription, RestaurantPageHeader } from '@/sections';
import fetchRestaurantDetails from '@/utils/lib/fetchRestaurantDetails';
import fetchRestaurantMenu from '@/utils/lib/fetchRestaurantMenu';

type Props = {
  params: {
    name: string;
  }
}

const RestaurantPage = async ({ params }: Props) => {
  const restaurant = await fetchRestaurantDetails(params.name);
  const menu = await fetchRestaurantMenu(params.name);

  return (
    <div className='w-screen min-h-screen'>
      <RestaurantPageHeader name={restaurant.name} location={restaurant.Location} />
      <RestaurantDescription menu={menu} title={restaurant.name} description={restaurant.description} images={restaurant.images} reviews={restaurant.reviews} open_time={restaurant.open_time} close_time={restaurant.close_time} slug={restaurant.slug} />
    </div>
  );
};

export default RestaurantPage;
