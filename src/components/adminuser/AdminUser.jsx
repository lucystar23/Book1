// AdminUser.jsx

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminNav from '../adminnav/AdminNav';
import '../adminuser/AdminUser.css';

// Updated class names in JSX

const UserCard = ({ user }) => {
    console.log('UserCard user:', user); // Log user data
    return (
      <Card variant="outlined" className="user-card"> {/* Updated class name */}
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            User Details
          </Typography>
          <Typography variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Email: {user.email}
          </Typography>
          {/* Add more user details as needed */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  };
  
  const AdminUser = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        let response;
        try {
          response = await fetch('http://localhost:3000/api/users/getusers');
          const data = await response.json();
          setUsers(data);
          console.log('Users data:', data); // Log users array
        } catch (error) {
          console.error('Error fetching users:', error);
          console.log('Full response:', response ? await response.text() : null);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
      <div>
        <main id="maind-content">
          <AdminNav />
          <section className="user-cards-container"> {/* Updated class name */}
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </section>
        </main>
      </div>
    );
  };
  

export default AdminUser;
