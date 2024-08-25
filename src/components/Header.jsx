// import { IoNotificationsOutline } from "react-icons/io5";
// import { FaRegUserCircle } from "react-icons/fa";
// import { useState } from "react";
// import { logoutUser } from "../store/authSlice";
// import { Button, MenuItem, Menu, IconButton, Avatar } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Header = () => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       toast.success("Logged out successfully");
//       // navigate('/login');
//     } catch (error) {
//       toast.error("Failed to logout. Please try again.");
//     }
//     handleClose();
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <h1 className="text-3xl font-extrabold tracking-tight">
//             <span className="text-white-100 drop-shadow-md">Tech</span>
//             <span className="text-gray-800 drop-shadow-md">Care</span>
//           </h1>
//         </div>

//         <nav className="flex-grow">
//           <ul className="flex justify-center space-x-8 text-lg font-medium">
//             <li>
//               <a
//                 href="#"
//                 className="hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 Bookings
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 Services
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 About Us
//               </a>
//             </li>
//           </ul>
//         </nav>

//         <div className="flex items-center space-x-6">
//           <button className="text-2xl hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-110">
//             <IoNotificationsOutline />
//           </button>
//           {user ? (
//             <div>
//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 {user.profilePicture ? (
//                   <Avatar alt={user.firstName} src={user.profilePicture} />
//                 ) : (
//                   <FaRegUserCircle />
//                 )}
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem
//                   onClick={() => {
//                     handleClose();
//                     navigate("/profile");
//                   }}
//                 >
//                   Profile
//                 </MenuItem>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </div>
//           ) : (
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import { styled, alpha } from '@mui/system';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { logoutUser } from '../store/authSlice';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #9333ea, #4f46e5)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
  padding: '0.5rem 0',
});

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.025em',
  fontSize: '1.875rem',
  '& .Tech': {
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  '& .Care': {
    color: '#000000',
    textShadow: '0 1px 2px rgba(255, 255, 255, 0.1)',
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '.75rem',
  fontWeight: 500,
  margin: '0 0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.1),
    transform: 'translateY(-2px)',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  margin: '0 0.5rem',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.1),
    transform: 'scale(1.1)',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: '2px solid #ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const Header = () => {
  const { user } = useSelector((state) => state.user);
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
      // navigate('/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
    handleClose();
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <StyledToolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo variant="h1">
              <span className="Tech">Tech</span>
              <span className="Care">Care</span>
            </Logo>
          </Box>

          <Box component="nav" sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink>Bookings</NavLink>
            <NavLink>Services</NavLink>
            <NavLink>About Us</NavLink>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ActionButton>
              <NotificationsOutlinedIcon />
            </ActionButton>

            {user ? (
              <>
                <ActionButton onClick={handleMenu}>
                  {user.profilePicture ? (
                    <UserAvatar alt={user.firstName} src={user.profilePicture} />
                  ) : (
                    <AccountCircleOutlinedIcon />
                  )}
                </ActionButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      minWidth: 120,
                    },
                  }}
                >
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  borderRadius: '20px',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: '#ffffff',
                    backgroundColor: alpha('#ffffff', 0.1),
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
