'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const AddToCartButton = ({ food, className = '' }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(food);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${added ? 'btn-success' : 'btn-primary'} ${className}`}
    >
      {added ? '✓ Added' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
