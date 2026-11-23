'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className='navbar sticky top-0 z-10 bg-base-100 shadow-sm'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4'>
        <Link href='/foods' className='text-xl font-bold'>
          🍔 Foods
        </Link>

        <Link href='/cart' className='btn btn-ghost'>
          🛒 Cart
          {totalItems > 0 && (
            <span className='badge badge-primary badge-sm'>{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
