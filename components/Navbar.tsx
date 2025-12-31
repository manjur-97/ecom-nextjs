"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../features/user/userSlice";
import { useState } from "react";
import { color } from '../components/ui/theme/Color'
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
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const categories = useSelector((state: RootState) => state.categories.items);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  let profileMenuTimeout: NodeJS.Timeout | null = null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="min-h-8 w-full flex justify-center items-center"
        style={{ background: color.primary, color: color.primaryText }}
      >
        <p className="text-sm p-0 m-0 text-white">
          Special Deal 🔥 |   🎉Extra 20% OFF for First Order
        </p>
      </div>
      {/* Main header */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-14 md:h-16">
            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 hover:bg-[var(--hover-bg)] rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              style={{ background: isMenuOpen ? color.secondary : "", color: color.secondaryText, ['--hover-bg' as any]: color.primary }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-start shrink-0 group">
              {/* <span
                className="text-xl md:text-2xl font-bold italic"
                style={{ color: color.primary }}>
                Hello Bangla
              </span> */}
              <img className="w-[100px] " src="logo-1.png" alt="Logo" />

            </Link>

            {/* Search bar (desktop) */}
            <div className="flex-1 max-w-2xl mx-auto hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
                <input
                  type="search"
                  placeholder="Search for Products, Brands and More"
                  className="w-full pl-10 h-9 border-none rounded-sm text-sm placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-yellow-400 shadow-sm"
                  style={{ background: color.secondary, color: color.secondaryText }}
                />
              </div>
            </div>

            {/* Right actions (desktop) */}
            <div className="flex items-center gap-1 md:gap-4 ml-auto">


              {/* Cart */}
              <Link href="/cart"
                className={`flex items-center gap-1 px-3 py-2 font-medium hover:bg-[var(--hover-bg)] rounded transition-colors relative`}
                onClick={() => { setIsMenuOpen(false) }}
                data-cart-icon
                style={{ background: color.secondary, color: color.secondaryText, ['--hover-bg' as any]: color.hoverBg }}
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2  rounded-full px-2 text-xs font-bold"
                    style={{ background: color.primary, color: color.primaryText }}
                  >{cartCount}</span>
                )}
              </Link>

              {/* Favorites */}
              <Link href="/seller"
                className="lg:flex items-center gap-1 px-3 py-2 font-medium hover:bg-[var(--hover-bg)] rounded transition-colors"
                onClick={() => { setIsMenuOpen(false) }}
                style={{ background: color.secondary, color: color.secondaryText, ['--hover-bg' as any]: color.hoverBg }}
              >
                <Heart size={18} />

              </Link>

              {/* Login/Profile */}
              <div
                className=" md:flex items-center gap-1 px-4 py-2 font-medium hover:bg-[var(--hover-bg)] rounded transition-colors relative group"
                onMouseEnter={() => {
                  if (profileMenuTimeout) clearTimeout(profileMenuTimeout);
                  setShowProfileMenu(true);
                }}
                onMouseLeave={() => {
                  profileMenuTimeout = setTimeout(() => setShowProfileMenu(false), 120);
                }}
                style={{ background: color.secondary, color: color.secondaryText, ['--hover-bg' as any]: color.hoverBg }}
              >
                <User size={18} />
                <ChevronDown className="hidden  md:flex" size={16} />
                {/* Dropdown */}
                {showProfileMenu && (
                  <div
                    className="absolute right-0 top-full mt-2 w-60 rounded shadow-lg border border-gray-200 py-2 z-50"
                    style={{ background: color.secondary, color: color.secondaryText }}
                    onMouseEnter={() => {
                      if (profileMenuTimeout) clearTimeout(profileMenuTimeout);
                      setShowProfileMenu(true);
                    }}
                    onMouseLeave={() => {
                      profileMenuTimeout = setTimeout(() => setShowProfileMenu(false), 120);
                    }}
                  >
                    {!username ? (
                      <>
                        <Link className="block px-4 py-2 hover:bg-[var(--hover-bg)]  hover:text-white" href="/login"
                          style={{ ['--hover-bg' as any]: color.primary }}
                        >Login</Link>
                        <Link className="block px-4 py-2 hover:bg-[var(--hover-bg)] hover:text-white" href="/register"
                          style={{ ['--hover-bg' as any]: color.primary }}
                        >Register</Link>
                      </>
                    ) : (
                      <>
                        <span className="block px-4 py-2 font-semibold text-gray-600"
                          style={{ color: color.primary }}
                        > Hello, {username}</span>
                        <Link className="block px-4 py-2 hover:bg-[var(--hover-bg)] hover:text-white" href="/account"
                          style={{ ['--hover-bg' as any]: color.primary }}
                        >Profile</Link>
                        <Link className="block px-4 py-2 hover:bg-[var(--hover-bg)] hover:text-white" href="account/change-password"
                          style={{ ['--hover-bg' as any]: color.primary }}
                        >Change Password</Link>
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
      <div className="md:hidden px-4 pb-3">
        <div className="relative container mx-auto">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2" size={18}
            style={{ color: color.secondaryText }}
          />
          <input
            type="search"
            placeholder="Search for Products, Brands and More"
            className="w-full pl-10 h-8 border-none rounded-sm text-sm  focus-visible:ring-2 focus-visible:ring-yellow-400 shadow-sm"
            style={{ background: color.secondary, color: color.secondaryText }}
          />
        </div>
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`lg:hidden fixed inset-0 top-22 z-50 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        style={{ background: color.secondary }}
      >
        <div className=" mx-auto px-4 py-4 h-full overflow-y-auto">

          {/* Mobile category wise subcategory menu links */}
          <div className="flex flex-col gap-2">
            <div className="relative flex w-[320px] bg-white  rounded shadow">
              {/* LEFT: Category List */}
              <ul className="w-[320px]">
                {categories.map((category) => (
                  <li
                    key={category.id}

                    className="w-fill px-4 py-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                  >
                    <span className="font-medium">{category.name}</span>
                    {category.hasDropdown && <span>›</span>}
                  </li>
                ))}
              </ul>


            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
