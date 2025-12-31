import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import categoriesReducer from "../features/products/categoriesSlice";
import userReducer from '../features/user/userSlice';
import ordersReducer from '../features/orders/ordersSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    user: userReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T): T => useSelector(selector);

