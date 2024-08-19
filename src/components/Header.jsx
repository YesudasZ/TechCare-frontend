import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { logoutUser } from "../store/authSlice";
import { Button, MenuItem, Menu, IconButton, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      // navigate('/login');
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
    handleClose();
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-white-100 drop-shadow-md">Tech</span>
            <span className="text-gray-800 drop-shadow-md">Care</span>
          </h1>
        </div>

        <nav className="flex-grow">
          <ul className="flex justify-center space-x-8 text-lg font-medium">
            <li>
              <a
                href="#"
                className="hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Bookings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-105"
              >
                About Us
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-6">
          <button className="text-2xl hover:text-teal-200 transition duration-300 ease-in-out transform hover:scale-110">
            <IoNotificationsOutline />
          </button>
          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user.profilePicture ? (
                  <Avatar alt={user.firstName} src={user.profilePicture} />
                ) : (
                  <FaRegUserCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
