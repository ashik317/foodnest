import FoodCard from '@/components/FoodCard';
import { getFoods } from '@/lib/foods';

const FoodsPage = async () => {
  const foods = await getFoods();

  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold'>Foods ({foods.length})</h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {foods.map((food, index) => (
          <FoodCard key={food.id} food={food} priority={index < 3} />
        ))}
      </div>
    </div>
  );
};

export default FoodsPage;
