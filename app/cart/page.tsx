"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity, clearCart } from "../../features/cart/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
        <ul className="divide-y divide-gray-200 mb-8">
          {cartItems.map(item => (
            <li key={item.id} className="flex flex-row items-center justify-between p-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
              <div className="flex-1 ml-4">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500">${item.price}</div>
              </div>
              <input
                type="number"
                className="border rounded px-2 w-16 text-center mr-4"
                value={item.quantity}
                min={1}
                onChange={e => dispatch(updateQuantity({ id: item.id, quantity: +e.target.value}))}
              />
              <button className="text-red-600" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="font-bold text-right mb-4">Total: ${total}</div>
        <button className="bg-green-600 px-4 py-2 text-white rounded" onClick={() => dispatch(clearCart())}>Checkout (Demo)</button>
        </>
      )}
    </main>
  );
}

