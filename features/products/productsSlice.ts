import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'Laptop',
      description: 'A high-performance laptop for work and play.',
      image: '/public/file.svg',
      price: 1200,
    },
    {
      id: '2',
      name: 'Smartphone',
      description: 'Latest-gen smartphone with amazing features.',
      image: '/public/window.svg',
      price: 800,
    }
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;

