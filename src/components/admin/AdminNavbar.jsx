
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     IconButton,
//     Avatar,
//     Badge,
//     Menu,
//     MenuItem,
//   } from '@mui/material';
//   import {
//     Notifications,
//     Brightness4,
//     Brightness7,
//     AccountCircle,
//   } from '@mui/icons-material';
//   import { useSelector, useDispatch } from 'react-redux';
//   import { useState } from 'react';
//   import { toggleTheme } from '../../store/themeSlice';
//   import { logoutUser } from '../../store/authSlice';
//   import { toast } from "react-toastify";
//   import { Link as RouterLink, useNavigate } from "react-router-dom";


//   const AdminNavbar = () => {
//     const user = useSelector((state) => state.user);
//     const isDarkMode = useSelector((state) => state.theme.darkMode);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
  
//     const [anchorEl, setAnchorEl] = useState(null);
  
//     const handleMenu = (event) => {
//       setAnchorEl(event.currentTarget);
//     };
  
//     const handleClose = () => {
//       setAnchorEl(null);
//     };

//     const handleLogout = async () => {
//       try {
//         await dispatch(logoutUser()).unwrap();
//         toast.success('Logged out successfully');
//         navigate('/login');
//       } catch (error) {
//         toast.error('Failed to logout. Please try again.');
//       }
//       handleClose();
//     };
  
//     return (
//       <AppBar
//         position="static"
//         sx={{
//           backgroundColor: isDarkMode ? '#333' : '#fff',
//           color: isDarkMode ? '#fff' : '#000',
//         }}
//         elevation={2}
//       >
//         <Toolbar>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, color: isDarkMode ? '#fff' : '#333' }}
//           >
//             Admin Dashboard
//           </Typography>
  
//           <IconButton color="inherit" sx={{ marginRight: 2 }}>
//             <Badge badgeContent={4} color="error">
//               <Notifications />
//             </Badge>
//           </IconButton>
  
//           <IconButton
//             color="inherit"
//             onClick={() => dispatch(toggleTheme())}
//             sx={{ marginRight: 2 }}
//           >
//             {isDarkMode ? <Brightness7 /> : <Brightness4 />}
//           </IconButton>
  
//           <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
//             <Avatar alt={user?.firstName} src={user?.profilePicture} />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleClose}>Profile</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     );
//   };
  
//   export default AdminNavbar;
  

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Menu, MenuItem, Badge, Avatar, IconButton, Typography, Box } from '@mui/material';
import { Notifications, Brightness4, Brightness7, AccountCircle, ExitToApp } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { toggleTheme } from '../../store/themeSlice';
import { logoutUser } from '../../store/authSlice';

const AdminNavbar = () => {
  const user = useSelector((state) => state.user);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
    handleClose();
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    }} elevation={3}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleTheme())}
            size="large"
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt={user?.firstName} src={user?.profilePicture} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
              <AccountCircle sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;