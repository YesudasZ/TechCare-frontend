import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  Badge,
} from "@mui/material";
import { styled, alpha } from "@mui/system";
import {Bell} from 'lucide-react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { logoutUser } from "../store/authSlice";
import { motion, useAnimation } from 'framer-motion';
import NotificationPopover from './NotificationPopover';
import io from 'socket.io-client';
import { addNotification } from "../store/notificationSlice";

const StyledAppBar = styled(AppBar)(({ theme, scroll }) => ({
  background: scroll ? "rgba(0,0, 0, 0)" : "rgba(0,0, 0, 0.1)",
  boxShadow: scroll ? "0 4px 6px rgba(0, 0, 0, 0)" : "none",
  backdropFilter: "blur(10px)",
  transition: "background 0.3s ease, box-shadow 0.3s ease",
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
  padding: "0.5rem 0",
});

const NavLink = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  fontSize: ".75rem",
  fontWeight: 500,
  margin: "0 0.5rem",
  padding: "0.5rem 1rem",
  borderRadius: "20px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.1),
    transform: "translateY(-2px)",
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: "#ffffff",
  margin: "0 0.5rem",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.1),
    transform: "scale(1.1)",
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: "2px solid #ffffff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scroll, setScroll] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const controls = useAnimation();

  useEffect(() => {
    if (unreadCount > 0) {
      controls.start({
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
    }
  }, [unreadCount, controls]);

  useEffect(() => {
    if (user) {
      const socket = io('http://localhost:3000', { withCredentials: true });
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        socket.emit('join user room', user.id);
      });

      socket.on('new notification', (notification) => {
        dispatch(addNotification(notification));
        toast.info(notification.content);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, dispatch]);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
    handleClose();
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledAppBar position="fixed" scroll={scroll}>
      <Container maxWidth="lg">
        <StyledToolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo1 />
            </Link>
          </Box>

          <Box component="nav" sx={{ display: "flex", alignItems: "center" }}>
            <NavLink component={Link} to="/bookings">
              Bookings
            </NavLink>
            <NavLink component={Link} to="/services">
              Services
            </NavLink>
            <NavLink component={Link} to="/about">
              About Us
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
          <motion.div animate={controls}>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="error">
              <Bell />
            </Badge>
          </IconButton>
        </motion.div>
        <NotificationPopover
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
        />
            {user ? (
              <>
                <ActionButton onClick={handleMenu}>
                  {user.profilePicture ? (
                    <UserAvatar
                      alt={user.firstName}
                      src={user.profilePicture}
                    />
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/wallet");
                    }}
                  >
                    Wallet
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
                  borderRadius: "20px",
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": {
                    borderColor: "#ffffff",
                    backgroundColor: alpha("#ffffff", 0.1),
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

const Logo1 = () => (
  <div className="flex-shrink-0 flex items-center">
    <svg
      className="h-8 w-auto"
      viewBox="0 0 184 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 8L28 24H4L16 8Z" fill="#60A5FA" />
      <path d="M16 24L4 8H28L16 24Z" fill="#2563EB" />
      <text
        x="36"
        y="24"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        fill="white"
      >
        Tech
      </text>
      <text
        x="100"
        y="24"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        fill="black"
      >
        Care
      </text>
    </svg>
  </div>
);

export default Header;
