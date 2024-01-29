import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const isLoggedIn = true;

  useEffect(() => {
    // Fetch cart items for the specific user from the server
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken._id;

        const response = await axios.get(`http://localhost:3000/api/cart/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>

<Navbar 
        // Use icons instead of text in the Navbar
        icons={[
          { icon: <HomeIcon />, link: '/' },
          { icon: <ShoppingCartIcon />, link: '/cart' },
          { icon: isLoggedIn ? <LogoutIcon /> : <LoginIcon />, link: isLoggedIn ? '/logout' : '/login' },
          // Add more icons as needed
        ]}
      />



      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body2" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.bname} src={`data:image/jpeg;base64,${item.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.bname}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: ${item.price}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      {cartItems.length > 0 && (
        <Typography variant="h6" align="right" gutterBottom>
          Total Price: ${calculateTotalPrice()}
        </Typography>
      )}
    </div>
  );
};

export default CartPage;
