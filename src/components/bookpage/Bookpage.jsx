import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Bookdetails from '../bookitems/Booksdetails';
import axios from 'axios';
import './Bookpage.css'; // Import a CSS file for styling
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Bookpage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books from your backend API
    axios.get('http://localhost:3000/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []); // Run this effect once when the component mounts

  const isLoggedIn = true; // Replace with your authentication logic

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
      <div className="book-container">
        {/* Render Bookdetails for each book in the array */}
        {books.map((book, index) => (
          <React.Fragment key={book._id}>
            <Bookdetails key={book._id} book={book} />
            {(index + 1) % 6 === 0 && <div className="clearfix" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Bookpage;
