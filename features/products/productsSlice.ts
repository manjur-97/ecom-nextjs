import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  offerPrice?: number;
  sizes?: string[];
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'A high-performance laptop for work and play.',
      description: 'A high-performance laptop for work and play.',
      image: '/public/file.svg',
      price: 1200,
      offerPrice: 999,
      sizes: ['13"', '15"', '17"'],
    },
    {
      id: '2',
      name: 'Smartphone',
      description: 'Latest-gen smartphone with amazing features.',
      image: '/public/window.svg',
      price: 800,
      offerPrice: 599,
      sizes: ['128GB', '256GB', '512GB'],
    },
    {
      id: '3',
      name: 'A high-performance laptop for work and play.',
      description: 'A high-performance laptop for work and play.',
      image: '/public/file.svg',
      price: 1200,
      offerPrice: 999,
      sizes: ['13"', '15"', '17"'],
    },
    {
      id: '4',
      name: 'Smartphone',
      description: 'Latest-gen smartphone with amazing features.',
      image: '/public/window.svg',
      price: 800,
      offerPrice: 599,
      sizes: ['128GB', '256GB', '512GB'],
    },
    {
      id: '5',
      name: 'A high-performance laptop for work and play.',
      description: 'A high-performance laptop for work and play.',
      image: '/public/file.svg',
      price: 1200,
      offerPrice: 999,
      sizes: ['13"', '15"', '17"'],
    },
    {
      id: '5',
      name: 'Smartphone',
      description: 'Latest-gen smartphone with amazing features.',
      image: '/public/window.svg',
      price: 800,
      offerPrice: 599,
      sizes: ['128GB', '256GB', '512GB'],
    },
    {
      id: '7',
      name: 'A high-performance laptop for work and play.',
      description: 'A high-performance laptop for work and play.',
      image: '/public/file.svg',
      price: 1200,
      offerPrice: 999,
      sizes: ['13"', '15"', '17"'],
    },
    {
      id: '8',
      name: 'Smartphone',
      description: 'Latest-gen smartphone with amazing features.',
      image: '/public/window.svg',
      price: 800,
      offerPrice: 599,
      sizes: ['128GB', '256GB', '512GB'],
    },
    {
      id: '8',
      name: 'A high-performance laptop for work and play.',
      description: 'A high-performance laptop for work and play.',
      image: '/public/file.svg',
      price: 1200,
      offerPrice: 999,
      sizes: ['13"', '15"', '17"'],
    },
    {
      id: '10',
      name: 'Smartphone',
      description: 'Latest-gen smartphone with amazing features.',
      image: '/public/window.svg',
      price: 800,
      offerPrice: 599,
      sizes: ['128GB', '256GB', '512GB'],
    }
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;

