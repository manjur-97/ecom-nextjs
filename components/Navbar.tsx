"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../features/user/userSlice";
import { useState } from "react";
// Lucide icons
import {
  User,
  Search,
  ShoppingCart,
  ChevronDown,
  Heart,
  X,
  Menu
} from "lucide-react";

export default function Navbar() {
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((a, b) => a + b.quantity, 0));
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Main header */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-14 md:h-16">
            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 text-white ${isMenuOpen ? "bg-white/10" : ""} hover:bg-white/20 rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-start shrink-0 group">
              <span className="text-xl md:text-2xl font-bold italic text-white">
                Flipkart
              </span>

            </Link>

            {/* Search bar (desktop) */}
            <div className="flex-1 max-w-2xl mx-auto hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
                <input
                  type="search"
                  placeholder="Search for Products, Brands and More"
                  className="w-full pl-10 h-9 bg-white border-none rounded-sm text-sm placeholder:text-blue-600 focus-visible:ring-2 focus-visible:ring-yellow-400 shadow-sm"
                />
              </div>
            </div>

            {/* Right actions (desktop) */}
            <div className="flex items-center gap-1 md:gap-4 ml-auto">


              {/* Cart */}
              <Link href="/cart"
                className="flex items-center gap-1 px-3 py-2 text-white font-medium bg-white/10 hover:bg-white/20 rounded transition-colors relative"
                onClick={() => { setIsMenuOpen(false) }}
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">{cartCount}</span>
                )}
              </Link>

              {/* Favorites */}
              <Link href="/seller"
                className="lg:flex items-center gap-1 px-3 py-2 text-white font-medium bg-white/10 hover:bg-white/20 rounded transition-colors"
                onClick={() => { setIsMenuOpen(false) }}
              >
                <Heart size={18} />

              </Link>

              {/* Login/Profile */}
              <div className="hidden md:flex items-center gap-1 px-4 py-2 text-white font-medium bg-white/10 hover:bg-white/20 rounded transition-colors relative group"
                onMouseEnter={() => setShowProfileMenu(true)} onMouseLeave={() => setShowProfileMenu(false)}>
                <User size={18} />

                <ChevronDown size={16} />
                {/* Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded shadow-lg border border-gray-200 py-2 z-50">
                    {!username ? (
                      <>
                        <Link className="block px-4 py-2 hover:bg-blue-50 text-blue-600" href="/login">Login</Link>
                        <Link className="block px-4 py-2 hover:bg-blue-50 text-blue-600" href="/register">Register</Link>
                      </>
                    ) : (
                      <>
                        <span className="block px-4 py-2 font-semibold text-gray-800">Hello, {username}</span>
                        <Link className="block px-4 py-2 hover:bg-blue-50 text-blue-600" href="/profile">Profile</Link>
                        <Link className="block px-4 py-2 hover:bg-blue-50 text-blue-600" href="/change-password">Change Password</Link>
                        <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-700" onClick={() => dispatch(logout())}>Logout</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden  bg-blue-600 px-4 pb-3">
        <div className="relative container mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
          <input
            type="search"
            placeholder="Search for Products, Brands and More"
            className="w-full pl-10 h-8 bg-white border-none rounded-sm text-sm placeholder:text-blue-600 focus-visible:ring-2 focus-visible:ring-yellow-400 shadow-sm"
          />
        </div>
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`lg:hidden fixed bg-blue-100 inset-0 top-[52px] z-50 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <div className="container mx-auto px-4 py-4 h-full overflow-y-auto">
          {/* Mobile login/profile area */}
          <div className="flex items-center gap-3 p-4 bg-blue-600 rounded-lg mb-4">
            <User size={24} className="text-white" />
            <div>
              <p className="text-white font-medium">{username ? `Hello, ${username}` : 'Login & Signup'}</p>
              <p className="text-white/70 text-sm">Manage orders, wishlist</p>
            </div>
          </div>
          {/* Mobile menu links */}
          <div className="flex flex-col gap-2">
            {!username ? (
              <>
                <Link href="/login" className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium" onClick={() => { setIsMenuOpen(false) }}>Login</Link>
                <Link href="/register" className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium" onClick={() => { setIsMenuOpen(false) }}>Register</Link>
              </>
            ) : (
              <>
                <Link href="/seller-dashboard" className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Dashboard</Link>
                <Link href="/profile" className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium" onClick={() => { setIsMenuOpen(false) }}>Settings</Link>
                <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-700 font-medium" onClick={() => { dispatch(logout()); setIsMenuOpen(false); }}>Logout</button>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
