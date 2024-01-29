import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
  cartCount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        cartCount: state.cartCount + 1,
      };

    case 'UPDATE_CART_COUNT':
      return {
        ...state,
        cartCount: action.payload,
      };

    // Add other cases for removing from cart, updating quantity, etc., as needed

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  // Load cart state from localStorage on component mount
  const storedCart = JSON.parse(localStorage.getItem('cart')) || initialState.cart;
  const [state, dispatch] = useReducer(cartReducer, { ...initialState, cart: storedCart });

  useEffect(() => {
    // Update cart count whenever the cart changes
    const newCartCount = state.cart.reduce((count, item) => count + item.quantity, 0);
    dispatch({ type: 'UPDATE_CART_COUNT', payload: newCartCount });

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart, dispatch]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
