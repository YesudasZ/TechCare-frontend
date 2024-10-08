import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toggleTheme } from "../../store/themeSlice";
import { logoutUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import NotificationPopover from "../NotificationPopover";
import io from "socket.io-client";
import { addNotification } from "../../store/notificationSlice";
import { motion, useAnimation } from "framer-motion";

const TechnicianNavbar = () => {
  const user = useSelector((state) => state.user.user);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const controls = useAnimation();

  useEffect(() => {
    if (unreadCount > 0) {
      controls.start({
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      });
    }
  }, [unreadCount, controls]);

  useEffect(() => {
    if (user) {
      const socket = io("https://techcare.live", { withCredentials: true });
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        socket.emit("join user room", user.id);
      });

      socket.on("new notification", (notification) => {
        dispatch(addNotification(notification));
        toast.info(notification.content);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, dispatch]);

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
      navigate("/login-technician");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
    handleClose();
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
      elevation={2}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: isDarkMode ? "#fff" : "#333" }}
        >
          Technician Dashboard
        </Typography>

        <IconButton
          color="inherit"
          onClick={handleNotificationClick}
          sx={{ marginRight: 2 }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <Bell />
          </Badge>
        </IconButton>

        <IconButton
          color="inherit"
          onClick={() => dispatch(toggleTheme())}
          sx={{ marginRight: 2 }}
        ></IconButton>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleMenu}
        >
          <Avatar alt={user?.firstName} src={user?.profilePicture} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            component={RouterLink}
            to="/technician/profile"
            onClick={handleClose}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <NotificationPopover
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TechnicianNavbar;
