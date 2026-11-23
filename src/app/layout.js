import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'FoodNest',
    template: '%s | FoodNest',
  },
  description: 'FoodNest - Browse popular foods in Dhaka',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='flex min-h-full flex-col'>
        <CartProvider>
          <Navbar />
          <main className='mx-auto w-full max-w-7xl px-4 py-6'>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}