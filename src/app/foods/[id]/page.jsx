import AddToCartButton from '@/components/AddToCartButton';
import { getFoodById, getFoods } from '@/lib/foods';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const foods = await getFoods();
  return foods.map((food) => ({ id: food.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const food = await getFoodById(id);
  return { title: food ? food.dish_name : 'Food not found' };
}

const formatLabel = (key) => key.replaceAll('_', ' ');

// Page shell: renders instantly
const FoodDetailsPage = ({ params }) => {
  return (
    <div className='space-y-10'>
      <Link href='/foods' className='btn btn-ghost btn-sm'>
        ← Back to Foods
      </Link>

      <Suspense fallback={<DetailsSkeleton />}>
        <FoodDetails params={params} />
      </Suspense>
    </div>
  );
};

// Loading placeholder
const DetailsSkeleton = () => (
  <div className='grid gap-8 md:grid-cols-2'>
    <div className='skeleton aspect-[4/3] w-full rounded-2xl' />
    <div className='flex flex-col gap-4'>
      <div className='skeleton h-6 w-32' />
      <div className='skeleton h-10 w-full' />
      <div className='skeleton h-6 w-48' />
      <div className='skeleton h-12 w-40' />
      <div className='skeleton h-12 w-48' />
    </div>
  </div>
);

// Actual content: reads params inside Suspense
const FoodDetails = async ({ params }) => {
  const { id } = await params;
  const food = await getFoodById(id);

  if (!food) notFound();

  const {
    dish_name,
    image_link,
    rating,
    price,
    cuisine,
    category = 'dish',
    origin_and_popularity,
    alternative_names = [],
    main_ingredients = [],
    cooking_steps = [],
    approximate_nutrition_per_serving: nutrition = {},
    possible_price_in_dhaka: dhakaPrices = {},
  } = food;

  return (
    <div className='space-y-10'>
      {/* Top section */}
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl'>
          <Image
            src={image_link}
            alt={dish_name}
            fill
            loading='eager'
            fetchPriority='high'
            className='object-cover'
            sizes='(min-width: 768px) 50vw, 100vw'
          />
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-wrap gap-2'>
            <span className='badge badge-outline capitalize'>{category}</span>
            <span className='badge badge-secondary'>★ {rating}</span>
          </div>

          <h1 className='text-3xl font-bold'>{dish_name}</h1>
          <p className='opacity-70'>{cuisine}</p>

          {alternative_names.length > 0 && (
            <p className='text-sm'>
              <span className='font-semibold'>Also known as: </span>
              {alternative_names.join(', ')}
            </p>
          )}

          <p className='text-4xl font-bold text-primary'>৳ {price}</p>

          <AddToCartButton
            food={{ id: food.id, dish_name, image_link, price }}
            className='btn-lg w-full sm:w-auto'
          />
        </div>
      </div>

      {/* Nutrition */}
      {Object.keys(nutrition).length > 0 && (
        <section>
          <h2 className='mb-4 text-2xl font-bold'>Nutrition per serving</h2>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
            {Object.entries(nutrition).map(([key, value]) => (
              <div key={key} className='rounded-xl bg-base-200 p-4'>
                <p className='text-sm capitalize opacity-70'>
                  {formatLabel(key)}
                </p>
                <p className='font-semibold'>{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Price in Dhaka */}
      {Object.keys(dhakaPrices).length > 0 && (
        <section>
          <h2 className='mb-4 text-2xl font-bold'>Price in Dhaka</h2>
          <div className='grid gap-3 sm:grid-cols-3'>
            {Object.entries(dhakaPrices).map(([key, value]) => (
              <div key={key} className='rounded-xl bg-base-200 p-4'>
                <p className='text-sm capitalize opacity-70'>
                  {formatLabel(key)}
                </p>
                <p className='font-semibold'>{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ingredients & Steps */}
      <div className='grid gap-8 lg:grid-cols-2'>
        <section>
          <h2 className='mb-4 text-2xl font-bold'>Ingredients</h2>
          <ul className='list-inside list-disc space-y-1'>
            {main_ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='mb-4 text-2xl font-bold'>Cooking Steps</h2>
          <ol className='space-y-3'>
            {cooking_steps.map((step, index) => (
              <li key={index} className='flex gap-3'>
                <span className='badge badge-primary shrink-0'>
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Origin */}
      {origin_and_popularity && (
        <section>
          <h2 className='mb-4 text-2xl font-bold'>Origin & Popularity</h2>
          <p className='leading-relaxed opacity-80'>{origin_and_popularity}</p>
        </section>
      )}
    </div>
  );
};

export default FoodDetailsPage;
