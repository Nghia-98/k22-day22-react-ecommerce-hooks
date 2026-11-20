import { useReducer } from 'react';
import { CartContext } from './cart-context.js';

function cartReducer(items, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = items.find((item) => item.id === action.payload.id);
      if (existing) {
        return items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { ...action.payload, quantity: 1 }];
    }
    case 'INCREASE':
      return items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    case 'DECREASE':
      return items.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    case 'REMOVE':
      return items.filter((item) => item.id !== action.payload.id);
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const increase = (id) => dispatch({ type: 'INCREASE', payload: { id } });
  const decrease = (id) => dispatch({ type: 'DECREASE', payload: { id } });
  const remove = (id) => dispatch({ type: 'REMOVE', payload: { id } });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, totalQuantity, totalPrice, addToCart, increase, decrease, remove }}
    >
      {children}
    </CartContext.Provider>
  );
}
