import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const BookDetails = ({ book }) => {
  const { dispatch, cart } = useCart();
  const [imageSrc, setImageSrc] = useState('');

  // Fetch the token from local storage
  const token = localStorage.getItem('token');

  // Parse the token to get user information
  const decodedToken = jwt_decode(token);

  // Extract the user ID
  const userId = decodedToken._id;

  const handleAddToCart = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a request to add the item to the cart
      const response = await axios.post(
        'http://localhost:3000/api/cart/cartadd',
        {
          user: userId,
          bookid: book._id,
          bname: book.bname,
          quantity: 1, // Assuming you want to add one item at a time
          price: book.price,
          author: book.author,
          genre: book.genre,
        },
        config
      );

      if (response.status === 201) {
        // Assuming the server sends back the added item with details
        const addedItem = response.data;

        // Check if the item is already in the cart
        const existingCartItem = cart.find(item => item.bookid === addedItem.bookid);

        if (existingCartItem) {
          // If the item is already in the cart, update its quantity
          const updatedCart = cart.map(item =>
            item.bookid === addedItem.bookid
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );

          dispatch({ type: 'SET_CART', payload: updatedCart });
        } else {
          // If the item is not in the cart, add it to the cart
          dispatch({ type: 'ADD_TO_CART', payload: addedItem });
        }

        console.log('Item added to the cart:', addedItem);
        
        // Update the cart count
        dispatch({ type: 'UPDATE_CART_COUNT' });
      }
    } catch (error) {
      console.error('Error adding item to the cart:', error);
    }
  }, [dispatch, book, cart, token, userId]);

  useEffect(() => {
    // Convert Buffer to data URL using FileReader
    if (book.image && book.image.data) {
      const bufferArray = new Uint8Array(book.image.data);
      const blob = new Blob([bufferArray], { type: 'image/jpeg' });
      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(blob);
    }
  }, [book.image]);

  useEffect(() => {
    console.log('Current Cart State:', cart);
  }, [cart]);

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <CardMedia
        component="img"
        height="240"
        style={{ objectFit: 'cover' }}
        src={imageSrc}
        alt={book.bname}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {book.bname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ISBN: {book.isbnn}
        </Typography>
        {/* Add more details as needed */}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAddToCart}>
          Add To Cart
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default BookDetails;
