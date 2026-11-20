import { useContext } from 'react';
import { Link } from 'react-router';
import { CartContext } from '../context/cart-context.js';
import { formatUSD } from '../utils/formatPrice';

function CartPage() {
  const { items, totalQuantity, totalPrice, increase, decrease, remove } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-gray-600">Giỏ hàng đang trống.</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-900">Giỏ hàng</h2>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const subtotal = item.price * item.quantity;

          return (
            <div key={item.id} className="flex items-center gap-4 rounded border bg-white p-3">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{formatUSD(item.price)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(item.id)}
                  disabled={item.quantity === 1}
                  className="h-7 w-7 cursor-pointer rounded border text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => increase(item.id)}
                  className="h-7 w-7 cursor-pointer rounded border text-sm"
                >
                  +
                </button>
              </div>

              <span className="w-24 text-right font-semibold text-gray-800">
                {formatUSD(subtotal)}
              </span>

              <button
                onClick={() => remove(item.id)}
                className="cursor-pointer text-sm text-red-600 hover:underline"
              >
                Xoá
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-gray-600">Tổng số lượng: {totalQuantity}</span>
        <span className="text-xl font-bold text-gray-900">Tổng tiền: {formatUSD(totalPrice)}</span>
      </div>
    </div>
  );
}

export default CartPage;
