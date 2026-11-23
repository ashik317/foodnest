'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  const {
    items,
    loaded,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (!loaded) {
    return (
      <span className='loading loading-spinner loading-lg mx-auto block' />
    );
  }

  if (items.length === 0) {
    return (
      <div className='py-20 text-center'>
        <h1 className='mb-4 text-3xl font-bold'>Your cart is empty</h1>
        <Link href='/foods' className='btn btn-primary'>
          Browse Foods
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold'>Cart ({totalItems})</h1>

      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Items */}
        <div className='space-y-4 lg:col-span-2'>
          {items.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 rounded-xl bg-base-100 p-4 shadow-sm'
            >
              <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-lg'>
                <Image
                  src={item.image_link}
                  alt={item.dish_name}
                  fill
                  className='object-cover'
                  sizes='80px'
                />
              </div>

              <div className='flex-1'>
                <Link
                  href={`/foods/${item.id}`}
                  className='font-semibold hover:underline'
                >
                  {item.dish_name}
                </Link>
                <p className='text-sm opacity-70'>৳ {item.price} each</p>
              </div>

              <div className='join'>
                <button
                  className='btn join-item btn-sm'
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className='btn join-item btn-sm pointer-events-none'>
                  {item.quantity}
                </span>
                <button
                  className='btn join-item btn-sm'
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className='w-20 text-right font-bold'>
                ৳ {item.price * item.quantity}
              </p>

              <button
                className='btn btn-ghost btn-sm text-error'
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className='h-fit rounded-xl bg-base-200 p-6'>
          <h2 className='mb-4 text-xl font-bold'>Order Summary</h2>
          <div className='flex justify-between'>
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className='mt-2 flex justify-between text-xl font-bold'>
            <span>Total</span>
            <span>৳ {totalPrice}</span>
          </div>
          <button className='btn btn-primary mt-6 w-full'>Checkout</button>
          <button className='btn btn-ghost mt-2 w-full' onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
