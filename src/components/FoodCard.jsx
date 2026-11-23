import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

const FoodCard = ({ food, priority = false }) => {
  const {
    id,
    dish_name,
    image_link,
    rating,
    cuisine,
    price,
    category = 'dish',
  } = food;

  return (
    <div className='card h-full bg-base-100 shadow-sm transition hover:shadow-lg'>
      <Link href={`/foods/${id}`}>
        <figure className='relative aspect-[4/3] w-full overflow-hidden'>
          <Image
            src={image_link}
            alt={dish_name}
            fill
            className='object-cover transition duration-300 hover:scale-105'
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
          />
        </figure>
      </Link>

      <div className='card-body'>
        <div className='flex items-start justify-between gap-2'>
          <h2 className='card-title line-clamp-2 text-lg'>{dish_name}</h2>
          <div className='badge badge-secondary shrink-0'>★ {rating}</div>
        </div>

        <p className='line-clamp-1 text-sm opacity-70'>{cuisine}</p>

        <div className='mt-auto flex items-center justify-between pt-2'>
          <span className='text-xl font-bold'>৳ {price}</span>
          <div className='badge badge-outline capitalize'>{category}</div>
        </div>

        <div className='card-actions mt-3 grid grid-cols-2 gap-2'>
          <Link href={`/foods/${id}`} className='btn btn-outline'>
            Details
          </Link>
          <AddToCartButton food={{ id, dish_name, image_link, price }} />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
