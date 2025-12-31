import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* =====================
   Types
===================== */

export interface SubCategory {
  id: number;
  name: string;
  icon: string;
}

export interface Category {
  id: number;
  name: string;
  hasDropdown: boolean;
  subcategories: SubCategory[];
}

interface CategoriesState {
  items: Category[];
}

/* =====================
   Initial State
===================== */

const initialState: CategoriesState = {
  items: [
    {
      id: 1,
      name: "Men",
      hasDropdown: true,
      subcategories: [
        { id: 101, name: "T-Shirts", icon: "👕" },
        { id: 102, name: "Shirts", icon: "👔" },
        { id: 103, name: "Panjabi & Kurta", icon: "🧥" },
        { id: 104, name: "Jeans & Trousers", icon: "👖" },
        { id: 105, name: "Jackets & Hoodies", icon: "🧥" },
        { id: 106, name: "Innerwear", icon: "🩲" },
      ],
    },
    {
      id: 2,
      name: "Women",
      hasDropdown: true,
      subcategories: [
        { id: 201, name: "Tops & T-Shirts", icon: "👚" },
        { id: 202, name: "Dresses", icon: "👗" },
        { id: 203, name: "Saree", icon: "🥻" },
        { id: 204, name: "Kurtis", icon: "👘" },
        { id: 205, name: "Jeans & Skirts", icon: "👖" },
        { id: 206, name: "Lingerie", icon: "🩱" },
      ],
    },
    {
      id: 3,
      name: "Kids",
      hasDropdown: true,
      subcategories: [
        { id: 301, name: "Boys Clothing", icon: "🧒" },
        { id: 302, name: "Girls Clothing", icon: "👧" },
        { id: 303, name: "Baby Wear", icon: "👶" },
        { id: 304, name: "School Wear", icon: "🎒" },
      ],
    },
    {
      id: 4,
      name: "Footwear",
      hasDropdown: true,
      subcategories: [
        { id: 401, name: "Men Shoes", icon: "👞" },
        { id: 402, name: "Women Shoes", icon: "👠" },
        { id: 403, name: "Sneakers", icon: "👟" },
        { id: 404, name: "Sandals & Slippers", icon: "🩴" },
      ],
    },
    {
      id: 5,
      name: "Bags",
      hasDropdown: true,
      subcategories: [
        { id: 501, name: "Backpacks", icon: "🎒" },
        { id: 502, name: "Handbags", icon: "👜" },
        { id: 503, name: "Sling Bags", icon: "👝" },
        { id: 504, name: "Travel Bags", icon: "🧳" },
        { id: 505, name: "Wallets", icon: "👛" },
      ],
    },
    {
      id: 6,
      name: "Accessories",
      hasDropdown: true,
      subcategories: [
        { id: 601, name: "Belts", icon: "🧢" },
        { id: 602, name: "Caps & Hats", icon: "🎩" },
        { id: 603, name: "Sunglasses", icon: "🕶️" },
        { id: 604, name: "Scarves", icon: "🧣" },
      ],
    },
    {
      id: 7,
      name: "Beauty",
      hasDropdown: true,
      subcategories: [
        { id: 701, name: "Makeup", icon: "💄" },
        { id: 702, name: "Skincare", icon: "🧴" },
        { id: 703, name: "Hair Care", icon: "💇" },
        { id: 704, name: "Fragrances", icon: "🌸" },
      ],
    },
    {
      id: 8,
      name: "Living",
      hasDropdown: true,
      subcategories: [
        { id: 801, name: "Home Decor", icon: "🖼️" },
        { id: 802, name: "Furnishings", icon: "🛋️" },
        { id: 803, name: "Kitchen & Dining", icon: "🍽️" },
        { id: 804, name: "Bedding & Bath", icon: "🛏️" },
      ],
    },
    {
      id: 9,
      name: "Watches",
      hasDropdown: true,
      subcategories: [
        { id: 901, name: "Men Watches", icon: "⌚" },
        { id: 902, name: "Women Watches", icon: "⌚" },
        { id: 903, name: "Smart Watches", icon: "⌚" },
        { id: 904, name: "Jewelry", icon: "💍" },
      ],
    },
    {
      id: 10,
      name: "Gifts",
      hasDropdown: false,
      subcategories: [],
    },
  ],
};

/* =====================
   Slice
===================== */

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
