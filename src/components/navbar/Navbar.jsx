import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Import Home icon
import BookIcon from '@mui/icons-material/MenuBook'; // Import Book icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import Logout icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import Account icon

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BiblioFind
        </Typography>

        {/* Home Button */}
        <Button color="inherit" component={Link} to="/">
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
        </Button>

        {/* Book Button */}
        <Button color="inherit" component={Link} to="/book">
          <IconButton color="inherit">
            <BookIcon />
          </IconButton>
        </Button>

        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogin}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin} component={Link} to="/login">
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
