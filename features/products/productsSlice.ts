import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  offerPrice?: number;
  originalPrice?:number;
  sizes?: string[];
  discount?:number;
  badge?:string;
  badgeColor?:string;
  expiresAt?:string;
  rating?:number;
  reviewCount?:number;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      name: "Nike Air Max 270 React - Premium Sneakers",
      description:'description',
      price: 129.99,
      originalPrice: 189.99,
      discount: 32,
      badge: "Hot Deal",
      badgeColor: "hot",
      expiresAt: "2025-01-15",
      rating: 4.8,
      reviewCount: 256,
      sizes: ['128GB', '256GB', '512GB'],
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      name: "Smart Watch Pro - Health & Fitness Tracker",
      description:'description',
      price: 249.00,
      originalPrice: 349.00,
      discount: 29,
      badge: "Limited",
      badgeColor: "limited",
      expiresAt: "2025-01-10",
      rating: 4.6,
      reviewCount: 189,
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      name: "Premium Wireless Headphones - Studio Quality",
      description:'description',
      price: 179.99,
      originalPrice: 299.99,
      discount: 40,
      badge: "Flash Sale",
      badgeColor: "sale",
      expiresAt: "2025-01-05",
      rating: 4.9,
      reviewCount: 412,
      sizes: ['40', '42', '44'],
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
      name: "Vintage Polaroid Camera - Instant Photos",
      description:'description',
      price: 89.99,
      badge: "New",
      badgeColor: "new",
      rating: 4.3,
      reviewCount: 78,
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&h=500&fit=crop",
      name: "Designer Leather Bag - Italian Craftsmanship",
      description:'description',
      price: 399.00,
      originalPrice: 549.00,
      discount: 27,
      badge: "Premium",
      badgeColor: "limited",
      rating: 4.7,
      reviewCount: 134,
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop",
      name: "Luxury Skincare Set - Complete Collection",
      description:'description',
      price: 159.99,
      originalPrice: 220.00,
      discount: 27,
      badge: "Best Seller",
      badgeColor: "hot",
      expiresAt: "2025-01-20",
      rating: 4.5,
      reviewCount: 298,
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1491553895911-0055uj8632a5?w=500&h=500&fit=crop",
      name: "Mechanical Keyboard RGB - Gaming Edition",
      description:'description',
      price: 129.00,
      originalPrice: 169.00,
      discount: 24,
      badge: "Sale",
      badgeColor: "sale",
      rating: 4.8,
      reviewCount: 567,
    },
    {
      id: "8",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      name: "Designer Sunglasses - UV Protection",
      description:'description',
      price: 199.00,
      badge: "New Arrival",
      badgeColor: "new",
      rating: 4.4,
      reviewCount: 92,
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;

