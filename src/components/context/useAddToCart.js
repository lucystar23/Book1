// useAddToCart.js

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADD_TO_CART } from './CartContext';


const useAddToCart = () => {
    const navigate = useNavigate();
    const { dispatch } = useCart();
  
    const addToCart = async (item, callback) => {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          console.error('Authorization token is missing');
          navigate('/login');
          return;
        }
  
        const response = await axios.post('http://localhost:3000/api/cart/cartadd', item, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 201) {
          dispatch({ type: ADD_TO_CART, payload: item });
          console.log('Item added to the cart:', response.data);
          if (callback) {
            callback();
          }
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error adding item to the cart:', error);
  
        if (error.response?.status === 401) {
          alert('Authentication error. Please log in again.');
          navigate('/login');
        } else {
          alert('An error occurred while adding the item to the cart. Please try again.');
        }
      }
    };
  
    return { addToCart };
  };
  
  export default useAddToCart;