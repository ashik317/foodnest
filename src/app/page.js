import FoodCard from '@/components/FoodCard';
import { getFoods } from '@/lib/foods';
import Link from 'next/link';

export default async function Home() {
  const foods = await getFoods();

  // Top 6 by rating
  const topFoods = [...foods].sort((a, b) => b.rating - a.rating).slice(0, 6);

  // Unique categories
  const categories = [...new Set(foods.map((food) => food.category ?? 'dish'))];

  return (
    <div className='space-y-16'>
      {/* Hero */}
      <section className='hero rounded-3xl bg-base-200 py-16'>
        <div className='hero-content text-center'>
          <div className='max-w-2xl'>
            <span className='badge badge-primary badge-outline mb-4'>
              🇧🇩 Dhaka&apos;s favourite dishes
            </span>
            <h1 className='text-4xl font-bold sm:text-5xl'>
              Welcome to Food<span className='text-primary'>Nest</span>
            </h1>
            <p className='py-6 text-lg opacity-70'>
              From Kacchi Biriyani to smashed burgers and creamy shakes. Explore
              recipes, nutrition and real Dhaka prices, all in one place.
            </p>
            <div className='flex flex-wrap justify-center gap-3'>
              <Link href='/foods' className='btn btn-primary btn-lg'>
                Browse Foods
              </Link>
              <Link href='/cart' className='btn btn-outline btn-lg'>
                🛒 View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='stats stats-vertical w-full bg-base-100 shadow sm:stats-horizontal'>
        <div className='stat place-items-center'>
          <div className='stat-title'>Dishes</div>
          <div className='stat-value text-primary'>{foods.length}</div>
        </div>
        <div className='stat place-items-center'>
          <div className='stat-title'>Categories</div>
          <div className='stat-value'>{categories.length}</div>
        </div>
        <div className='stat place-items-center'>
          <div className='stat-title'>Top Rating</div>
          <div className='stat-value text-secondary'>
            ★ {topFoods[0]?.rating ?? '-'}
          </div>
        </div>
      </section>

      {/* Top rated */}
      <section>
        <div className='mb-6 flex items-end justify-between'>
          <h2 className='text-3xl font-bold'>Top Rated</h2>
          <Link href='/foods' className='link link-primary'>
            See all →
          </Link>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {topFoods.map((food, index) => (
            <FoodCard key={food.id} food={food} priority={index < 3} />
          ))}
        </div>
      </section>
    </div>
  );
}
