import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, CardContent, CardActions, Card, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Bookdetails from '../bookitems/Booksdetails';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../context/CartContext';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const { cart } = useCart();

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const maxBooksToShow = 5;
  const [displayedBooks, setDisplayedBooks] = useState([]);

  useEffect(() => {
    setDisplayedBooks(books.slice(0, maxBooksToShow));
  }, [books]);

  const carouselData = [
    { image: require('../../components/img/book3.webp'), text: '"Explore worlds between the pages, dive into the magic of reading."' },
    { image: require('../../components/img/book4.jpg'), text: '"Words have the power to inspire, to transport, to change. Find your words here."' },
    { image: require('../../components/img/book6.jpg'), text: '"In a world of stories, find yours at our book heaven."' },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex, carouselData.length]);

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '60vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BiblioFind
            </Typography>
            <IconButton color="inherit" component={Link} to="/book">
              <BookIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <>
                <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogin}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <IconButton color="inherit" component={Link} to="/login">
                  <LoginIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
        <div style={{ flex: 1, overflow: 'hidden', textAlign: 'center', position: 'relative' }}>
          {carouselData.map((slide, index) => (
            <div
              key={index}
              style={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: index === currentIndex ? 1 : 0, // Show current slide
                zIndex: index === currentIndex ? 1 : 0, // Ensure current slide is on top
                transition: 'opacity 1s ease-in-out',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: index < 2 ? 'black' : 'white', // Change color for the first two texts
                  textAlign: 'center',
                }}
              >
                <Typography variant={index < 2 ? 'h4' : 'h5'} sx={{ fontWeight: index < 2 ? 'bold' : 'normal' }}>
                  {slide.text}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '16px' }}>
        {displayedBooks.map((book) => (
          <Bookdetails key={book._id} book={book} />
        ))}
        {books.length > displayedBooks.length && (
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Show More
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/book">
                Show More
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>
    </>
  );
};

export default Homepage;
