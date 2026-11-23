'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { totalItems } = useCart();
  const pathname = usePathname();

  // Home ('/') must match exactly; other links also match their sub-pages
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkClass = (href) =>
    `btn btn-ghost btn-sm ${isActive(href) ? 'btn-active' : ''}`;

  return (
    <nav className='navbar sticky top-0 z-10 bg-base-100 shadow-sm'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 text-xl font-bold'>
          <span className='text-2xl'>🍽️</span>
          <span>
            Food<span className='text-primary'>Nest</span>
          </span>
        </Link>

        {/* Links */}
        <div className='flex items-center gap-1 sm:gap-2'>
          <Link href='/' className={linkClass('/')}>
            Home
          </Link>

          <Link href='/foods' className={linkClass('/foods')}>
            Foods
          </Link>

          <Link href='/cart' className={linkClass('/cart')}>
            🛒 Cart
            {totalItems > 0 && (
              <span className='badge badge-primary badge-sm'>{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
