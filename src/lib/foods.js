import { cacheLife } from 'next/cache';

export async function getFoods() {
  'use cache';
  cacheLife('hours');

  const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/foods');
  const data = await res.json();
  return data?.data ?? [];
}

export async function getFoodById(id) {
  const foods = await getFoods();
  return foods.find((food) => food.id === id) ?? null;
}