import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  items: any[];
  customer: {
    name: string;
    email: string;
    mobile: string;
    division: string;
    district: string;
    thana: string;
    address: string;
  };
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  payment: 'Paid' | 'Unpaid';
  date: string;
  details?: string;
}

interface OrdersState {
  orders: OrderItem[];
}

const initialState: OrdersState = {
  orders: typeof window !== 'undefined' && localStorage.getItem('orders')
    ? JSON.parse(localStorage.getItem('orders')!)
    : [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      state.orders.unshift(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    },
    setOrders: (state, action: PayloadAction<OrderItem[]>) => {
      state.orders = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    },
  },
});

export const { addOrder, setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
