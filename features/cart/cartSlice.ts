import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
  offerPrice?: number;
  sizes?: string[];
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
}

// Helper: Load cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('cart_items');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper: Save cart to localStorage
const saveCartToLocalStorage = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cart_items', JSON.stringify(items));
  } catch {
    console.error('Failed to save cart to localStorage');
  }
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Initialize cart from localStorage
    initializeCart: (state) => {
      state.items = loadCartFromLocalStorage();
    },
    
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(i => i.id === action.payload.id);
      if (existingItem) {
        // Merge quantities for existing item
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;

